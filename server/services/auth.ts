import * as passport from 'koa-passport'
import * as _ from 'lodash'
import * as crypto from 'crypto'
import { Strategy as LocalStrategy } from 'passport-local'

import config from '../config'
import { User } from '../models'
import * as Joi from '@hapi/joi'
import { PUBLIC_USER_PROPS } from '../controllers'

/*
TODO Need testing for:
- 3 steps of third party authentication: User exists, User mail exists, No user exists
- Check errors are passed and promise handled
 */

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const currentUser = await User.findOne({ _id: id })
    if (!currentUser) done(new Error('User not found')) // TODO pass error to the client (error code disconnect)
    done(null, currentUser)
  } catch (err) {
    done(err)
  }
})

/*
 ** Username/password
 */

// TODO Add maximum for each field
passport.use(
  'signup',
  new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    const userSchema = Joi.object()
      .keys({
        username: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(6)
          .required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        language: Joi.string().allow('fr', 'en'),
      })
      .required()

    const { value: userInput } = await userSchema.validate(req.body)
    const user = new User(userInput)

    try {
      await user.savePassword(userInput.password)
      await user.save()
      done(null, _.pick(user, PUBLIC_USER_PROPS))
    } catch (err) {
      if (err.code == 11000 && err.keyPattern && err.keyPattern.hasOwnProperty('username')) {
        done(err)
        // TODO Pass error to client
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
 ** Google
 */

const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: config.APIS.GOOGLE_CONSUMER_KEY,
      clientSecret: config.APIS.GOOGLE_CONSUMER_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      const googleData: any = {
        firstName: _.get(profile, ['name', 'givenName']),
        lastName: _.get(profile, ['name', 'familyName']),
      }
      if (!profile.emails) {
        // TODO better
        return cb(new Error('Google auth: no email found')) // TODO Pass error to client using HTML code failed auth
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
 ** Facebook
 */

const FacebookStrategy = require('passport-facebook').Strategy

passport.use(
  new FacebookStrategy(
    {
      clientID: config.APIS.FACEBOOK_APP_ID,
      clientSecret: config.APIS.FACEBOOK_APP_SECRET,
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

const FortyTwoStrategy = require('passport-42').Strategy

passport.use(
  new FortyTwoStrategy(
    {
      clientID: config.APIS.FORTYTWO_APP_ID,
      clientSecret: config.APIS.FORTYTWO_APP_SECRET,
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
