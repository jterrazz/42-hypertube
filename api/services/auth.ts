import * as passport from 'koa-passport'
import * as _ from 'lodash'
import * as crypto from 'crypto'
import { Strategy as LocalStrategy } from 'passport-local'
import axios from 'axios'

import config from '../config'
import { User } from '../models'
import * as Joi from '@hapi/joi'
import { cacheToImageFolder, PRIVATE_USER_PROPS } from '../controllers'

export class ClientError extends Error {
  constructor(code, message) {
    super(message)
    this.statusCode = code
  }

  statusCode = 400
}

/*
 * When a client login, he receives an immutable (with a secure signature) token containing the user._id
 */
passport.serializeUser(async (user, done) => {
  try {
    await done(null, user._id)
  } catch (err) {
    done(err)
  }
})

/*
 * When the client makes a request, he attach the secure token. From the id,
 * we retrieve the full user object and passport place it in ctx.state.user
 */
passport.deserializeUser(async (id, done) => {
  try {
    const currentUser = await User.findOne({ _id: id })
    if (!currentUser) done(new ClientError(404, 'User not found'))
    await done(null, currentUser.toObject())
  } catch (err) {
    done(err)
  }
})

/*
 * STRATEGY: Username/password
 */

passport.use(
  'signup',
  new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    const userSchema = Joi.object()
      .keys({
        username: Joi.string()
          .alphanum()
          .min(3)
          .max(42)
          .required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(8)
          .max(100)
          .required(),
        firstName: Joi.string()
          .max(42)
          .required(),
        lastName: Joi.string()
          .max(42)
          .required(),
        language: Joi.string()
          .valid('fr-FR', 'en-US')
          .default('en-US'),
        reCaptcha: Joi.string(),
      })
      .required()

    try {
      const userInput = await userSchema.validateAsync(req.body)

      const { data } = await axios.get('https://www.google.com/recaptcha/api/siteverify', {
        params: { response: userInput.reCaptcha, secret: config.CAPTCHA_KEY },
      })

      if (!data.success) {
        return done(new ClientError(409, 'Wrong captcha code'))
      }

      const profileImage = req.files['profileImage']
      if (!profileImage) {
        return done(new ClientError(409, 'A profile image is required'))
      }

      // Setup new user
      const profileImageName = await cacheToImageFolder(profileImage)
      const user = new User({ ...userInput, profileImageName })
      await user.savePassword(userInput.password)
      await user.save()

      await done(null, _.pick(user, PRIVATE_USER_PROPS))
    } catch (err) {
      if (err.code == 11000 && err.keyPattern) {
        if (err.keyPattern.hasOwnProperty('username')) {
          return done(new ClientError(409, 'This username is already in use'))
        } else if (err.keyPattern.hasOwnProperty('email')) {
          return done(new ClientError(409, 'This email is already in use'))
        }
      }
      done(err)
    }
  }),
)

passport.use(
  'signin',
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username })
      if (!user) return done(null, false)
      if (!(await user.verifyPassword(password))) return done(null, false)
      await done(null, user.toObject())
    } catch (err) {
      done(err)
    }
  }),
)

/*
 * EXTERNAL STRATEGIES
 */

const externalAuth = async (userData, serviceAuthKey, serviceAuthId, cb) => {
  if (!userData.email) {
    return cb(new ClientError(422, 'No email found from your 2id service'))
  }

  try {
    // Step 1: If user exists, login
    let user = await User.findOne({ googleAuthId: serviceAuthId })
    if (user) return await cb(null, user)

    // Step 2: If the email is already registered, link the accounts and register
    user = await User.findOneAndUpdate({ email: userData.email }, { $set: { googleAuthId: serviceAuthId } })
    if (user) return await cb(null, user)

    // Step 3: Create a new user
    user = new User({
      username: crypto.randomBytes(20).toString('hex'),
      usernameRandom: true,
      firstName: userData.firstName,
      lastName: userData.lastName,
      profilePicture: { url: userData.profilePicture },
      email: userData.email,
    })
    await user.save()
    return await cb(null, user)
  } catch (err) {
    return cb(err)
  }
}

/*
 * STRATEGY: Google
 */

const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: config.API_GOOGLE_CONSUMER_KEY,
      clientSecret: config.API_GOOGLE_CONSUMER_SECRET,
      callbackURL: '/auth/google/callback',
    },
    function(accessToken, refreshToken, profile, cb) {
      const userData = {
        firstName: _.get(profile, 'name.givenName'),
        lastName: _.get(profile, 'name.familyName'),
        email: _.get(profile, 'emails[0].value'),
        profilePicture: _.get(profile, 'photos[0].value'),
      }

      externalAuth(userData, 'googleAuthId', profile.id, cb)
    },
  ),
)

/*
 * STRATEGY: Facebook
 */

const FacebookStrategy = require('passport-facebook').Strategy

passport.use(
  new FacebookStrategy(
    {
      clientID: config.API_FACEBOOK_APP_ID,
      clientSecret: config.API_FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['email', 'id', 'name', 'photos'],
    },
    function(accessToken, refreshToken, profile, cb) {
      const userData = {
        firstName: _.get(profile, 'name.givenName'),
        lastName: _.get(profile, 'name.familyName'),
        email: _.get(profile, '_json.email'),
        profilePicture: _.get(profile, 'photos[0].value'),
      }

      externalAuth(userData, 'facebookAuthId', profile.id, cb)
    },
  ),
)

/*
 * STRATEGY: 42
 */

const FortyTwoStrategy = require('passport-42').Strategy

passport.use(
  new FortyTwoStrategy(
    {
      clientID: config.API_FORTYTWO_APP_ID,
      clientSecret: config.API_FORTYTWO_APP_SECRET,
      callbackURL: '/auth/42/callback',
    },
    function(accessToken, refreshToken, profile, cb) {
      const userData = {
        firstName: _.get(profile, 'name.givenName'),
        lastName: _.get(profile, 'name.familyName'),
        email: _.get(profile, 'emails[0].value'),
        profilePicture: _.get(profile, 'photos[0].value'),
      }

      externalAuth(userData, 'intraAuthId', profile.id, cb)
    },
  ),
)

/*
 * STRATEGY: GitHub
 */

const GitHubStrategy = require('passport-github').Strategy

passport.use(
  new GitHubStrategy(
    {
      clientID: config.API_GITHUB_CLIENT_ID,
      clientSecret: config.API_GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    function(accessToken, refreshToken, profile, cb) {
      const userData = {
        email: _.get(profile, '_json.email'),
        profilePicture: _.get(profile, '_json.avatar_url'),
      }

      externalAuth(userData, 'githubAuthId', profile.id, cb)
    },
  ),
)
