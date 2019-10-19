import * as passport from 'koa-passport'
import * as _ from 'lodash'
import * as crypto from 'crypto'
import { Strategy as LocalStrategy } from 'passport-local'

import config from '../config'
import { User } from '../models'
import * as Joi from '@hapi/joi'
import { PRIVATE_USER_PROPS } from '../controllers'

export class ClientError extends Error {
  constructor(code, message) {
    super(message)
    this.statusCode = code
  }

  statusCode = 400
  isPassable = true
}

/*
 * When a client login, he receives an immutable (with a secure signature) token containing the user._id
 */
passport.serializeUser((user, done) => {
  done(null, user._id)
})

/*
 * When the client makes a request, he attach the secure token. From the id,
 * we retrieve the full user object and passport place it in ctx.state.user
 */
passport.deserializeUser(async (id, done) => {
  try {
    const currentUser = await User.findOne({ _id: id })
    if (!currentUser) done(new ClientError(404, 'User not found'))
    done(null, currentUser)
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
        language: Joi.string().valid('fr-FR', 'en-US'),
      })
      .required()

    try {
      const userInput = await userSchema.validateAsync(req.body)

      const user = new User(userInput)
      await user.savePassword(userInput.password)
      await user.save()
      done(null, _.pick(user, PRIVATE_USER_PROPS))
    } catch (err) {
      if (err.code == 11000 && err.keyPattern) {
        if (err.keyPattern.hasOwnProperty('username')) {
          done(new ClientError(409, 'This username is already in use'))
        } else if (err.keyPattern.hasOwnProperty('email')) {
          done(new ClientError(409, 'This email is already in use'))
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
      done(null, user)
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
      clientSecret: config.GOOGLE_CONSUMER_SECRET,
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
        if (user) return cb(null, user)
        user = await User.findOneAndUpdate({ email: googleData.email }, { $set: { googleAuthId: profile.id } })
        if (user) return cb(null, user)
        user = new User({
          username: crypto.randomBytes(20).toString('hex'),
          firstName: googleData.firstName,
          lastName: googleData.lastName,
          profilePicture: { url: googleData.profilePicture },
          email: googleData.email,
        })
        await user.save()
        return cb(null, user)
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
        .then(user => {
          if (!user) {
            const newUser = new User({
              username: crypto.randomBytes(20).toString('hex'),
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile._json.email,
              profilePicture: profile.photos ? profile.photos[0].value : null,
              facebookAuthId: profile.id,
            })
            User.findOneAndUpdate({ email: profile._json.email }, { $set: { facebookAuthId: profile.id } })
              .then(user => {
                if (user) {
                  return cb(null, user)
                } else {
                  newUser
                    .save()
                    .then(user => {
                      return cb(null, user)
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
            return cb(null, user)
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
            profilePicture: profile.photos[0].value,
            intraAuthId: profile.id,
          })
          user = await User.findOneAndUpdate({ email: profile.emails[0].value }, { $set: { intraAuthId: profile.id } })
          if (!user) {
            user = await newUser.save()
            return cb(null, user)
          } else {
            return cb(null, user)
          }
        } else {
          return cb(null, user)
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
              profilePicture: profile._json.avatar_url,
              githubAuthId: profile.id,
            })
            user = await newUser.save()
            return cb(null, user)
          } else {
            return cb(null, user)
          }
        } else {
          return cb(null, user)
        }
      } catch (err) {
        return cb(err)
      }
    },
  ),
)
