import * as passport from 'koa-passport'
import * as Router from 'koa-router'

import { sendResetEmailController, successfulAuthController, resetPasswordController } from '../controllers'
import { cacheFileMiddleware, saveProfileImageMiddleware } from '../middlewares/file-uploads'

const authRouter = new Router()

authRouter
  // Local
  .post(
    '/signup',
    cacheFileMiddleware,
    passport.authenticate('signup'),
    saveProfileImageMiddleware,
    successfulAuthController,
  )
  .post('/signin', passport.authenticate('signin'), successfulAuthController)
  .post('/send-reset-email', sendResetEmailController)
  .post('/reset-password', resetPasswordController)
  .get('/logout', (ctx: any) => {
    ctx.logout()
    ctx.status = 200
  })

  // Third parties
  .get(
    '/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'],
    }),
  )
  .get('/google/callback', passport.authenticate('google'), successfulAuthController)
  .get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
  .get('/facebook/callback', passport.authenticate('facebook'), successfulAuthController)
  .get('/42', passport.authenticate('42'))
  .get('/42/callback', passport.authenticate('42'), successfulAuthController)
  .get('/github', passport.authenticate('github'))
  .get('/github/callback', passport.authenticate('github'), successfulAuthController)

export default authRouter
