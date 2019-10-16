import * as passport from 'koa-passport'
import * as Router from 'koa-router'

import { resetPasswordController, successfulAuthController } from '../controllers'
import { isUser } from '../middlewares/auth'

const authRouter = new Router()

authRouter.post('/signup', passport.authenticate('signup'), successfulAuthController)
authRouter.post('/signin', passport.authenticate('signin'), successfulAuthController)
authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'],
  }),
)
authRouter.get('/google/callback', passport.authenticate('google'), successfulAuthController)
authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
authRouter.get('/facebook/callback', passport.authenticate('facebook'), successfulAuthController)
authRouter.get('/42', passport.authenticate('42'))
authRouter.get('/42/callback', passport.authenticate('42'), successfulAuthController)
authRouter.get('/github', passport.authenticate('github'))
authRouter.get('/github/callback', passport.authenticate('github'), successfulAuthController)

authRouter.post('/reset-password', isUser, resetPasswordController)

export default authRouter
