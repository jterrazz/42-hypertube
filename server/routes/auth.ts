import * as passport from 'koa-passport'
import * as Router from 'koa-router'

import { successfulAuthController } from '../controllers'

const authRouter = new Router()

authRouter.post('/auth/signup', passport.authenticate('signup'), successfulAuthController)
authRouter.post('/auth/signin', passport.authenticate('signin'), successfulAuthController)
authRouter.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'],
  }),
)
authRouter.get('/auth/google/callback', passport.authenticate('google'), successfulAuthController)
authRouter.get('/auth/facebook/', passport.authenticate('facebook', { scope: ['email']}))
authRouter.get('/auth/facebook/callback', passport.authenticate('facebook'))

export default authRouter
