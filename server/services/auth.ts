import * as passport from 'koa-passport'
import * as _ from 'lodash'
import * as crypto from 'crypto'

import config from '../config'
import { User } from '../models'

/*
TODO Need testing for:
- 3 steps of third party authentication: User exists, User mail exists, No user exists
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
      if (!profile.emails.length) {
        return cb(new Error('Google auth: no email found')) // TODO Pass error to client using HTML code failed auth
      }
      googleData.email = profile.emails[0].value
      if (profile.photos.length) {
        googleData.profilePicture = profile.photos[0].value
      }

      try {
        let user = await User.findOne({ googleAuthId: profile.id })
        if (user) return cb(null, user)
        user = await User.findOneAndUpdate({ email: googleData.email }, { $set: { googleAuthId: profile.id } })
        if (user) return cb(null, user)
        user = new User({
          username: googleData.firstName + crypto.randomBytes(10).toString('hex'),
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
