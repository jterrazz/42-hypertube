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
    await done(null, currentUser)
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
      await done(null, user)
    } catch (err) {
      done(err)
    }
  }),
)

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
    async (accessToken, refreshToken, profile, cb) => {
      const googleData: any = {
        firstName: _.get(profile, ['name', 'givenName']),
        lastName: _.get(profile, ['name', 'familyName']),
      }
      if (!profile.emails) {
        return cb(new Error('Google auth: no email found'))
      }
      googleData.email = profile.emails[0].value
      if (profile.photos) {
        googleData.profilePicture = profile.photos[0].value
      }

      try {
        let user = await User.findOne({ googleAuthId: profile.id })
        if (user) return await cb(null, user)
        user = await User.findOneAndUpdate({ email: googleData.email }, { $set: { googleAuthId: profile.id } })
        if (user) return await cb(null, user)
        user = new User({
          username: crypto.randomBytes(20).toString('hex'),
          firstName: googleData.firstName,
          lastName: googleData.lastName,
          profilePicture: { url: googleData.profilePicture },
          email: googleData.email,
        })
        await user.save()
        return await cb(null, user)
      } catch (err) {
        return cb(err)
      }
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
      if (!profile._json.email) {
        return cb(new Error('Facebook auth: no email found'))
      }
      User.findOne({ facebookAuthId: profile.id })
        .then(async user => {
          if (!user) {
            const newUser = new User({
              username: crypto.randomBytes(20).toString('hex'),
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile._json.email,
              profilePicture: profile.photos ? profile.photos[0].value : null, // TODO Delete or adapt
              facebookAuthId: profile.id,
            })
            User.findOneAndUpdate({ email: profile._json.email }, { $set: { facebookAuthId: profile.id } })
              .then(async user => {
                if (user) {
                  return await cb(null, user)
                } else {
                  newUser
                    .save()
                    .then(async user => {
                      return await cb(null, user)
                    })
                    .catch(err => {
                      return cb(err)
                    })
                }
              })
              .catch(err => {
                return cb(err)
              })
          } else {
            return await cb(null, user)
          }
        })
        .catch(err => {
          return cb(err)
        })
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
    async function(accessToken, refreshToken, profile, cb) {
      if (!profile.emails[0].value) {
        return cb(new Error('42 auth: no email found'))
      }
      try {
        let user = await User.findOne({ intraAuthId: profile.id })
        if (!user) {
          const newUser = new User({
            username: crypto.randomBytes(20).toString('hex'),
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            profilePicture: profile.photos[0].value, // TODO Delete or adapt
            intraAuthId: profile.id,
          })
          user = await User.findOneAndUpdate({ email: profile.emails[0].value }, { $set: { intraAuthId: profile.id } })
          if (!user) {
            user = await newUser.save()
            return await cb(null, user)
          } else {
            return await cb(null, user)
          }
        } else {
          return await cb(null, user)
        }
      } catch (err) {
        return cb(err)
      }
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
    async function(accessToken, refreshToken, profile, cb) {
      if (!profile._json.email) {
        return cb(new Error('Github auth: no email found'))
      }
      try {
        let user = await User.findOne({ githubAuthId: profile.id })
        if (!user) {
          user = await User.findOneAndUpdate({ email: profile._json.email }, { $set: { githubAuthId: profile.id } })
          if (!user) {
            const newUser = new User({
              username: crypto.randomBytes(20).toString('hex'),
              email: profile._json.email,
              profilePicture: profile._json.avatar_url, // TODO Delete or adapt
              githubAuthId: profile.id,
            })
            user = await newUser.save()
            return await cb(null, user)
          } else {
            return await cb(null, user)
          }
        } else {
          return await cb(null, user)
        }
      } catch (err) {
        return cb(err)
      }
    },
  ),
)