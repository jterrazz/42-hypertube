import * as passport from 'koa-passport'
import * as Router from 'koa-router'

import {
  sendResetEmailController,
  successfulAuthController,
  resetPasswordController,
  successfulAuthRedirectController,
  logoutController,
} from '../controllers'
import { cacheFileMiddleware } from '../middlewares/file-uploads'

const authRouter = new Router()

authRouter
  // Local
  .post('/signup', cacheFileMiddleware, passport.authenticate('signup'), successfulAuthController)
  .post('/signin', passport.authenticate('signin'), successfulAuthController)
  .post('/send-reset-email', sendResetEmailController)
  .post('/reset-password', resetPasswordController)
  .get('/logout', logoutController)

  // Third parties
  .get(
    '/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'],
    }),
  )
  .get('/google/callback', passport.authenticate('google'), successfulAuthRedirectController)
  .get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
  .get('/facebook/callback', passport.authenticate('facebook'), successfulAuthRedirectController)
  .get('/42', passport.authenticate('42'))
  .get('/42/callback', passport.authenticate('42'), successfulAuthRedirectController)
  .get('/github', passport.authenticate('github'))
  .get('/github/callback', passport.authenticate('github'), successfulAuthRedirectController)

export default authRouter
