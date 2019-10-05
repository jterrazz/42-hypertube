import * as passport from 'koa-passport'
import config from './config'

const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: config.APIS.GOOGLE_CONSUMER_KEY,
      clientSecret: config.APIS.GOOGLE_CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
    }, (accessToken, refreshToken, profile, cb) => {
    console.log("Google authentication ft here")

    cb()
}))
