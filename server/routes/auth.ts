import { authUsernameController, successfulAuthenticationController } from '../controllers'
import * as passport from 'koa-passport'
import * as Router from 'koa-router'

const router = new Router()

router.post('/auth/username', authUsernameController)

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'],
  }),
)
router.get('/auth/google/callback', passport.authenticate('google'), successfulAuthenticationController)

// TODO Add Facebook Authentication
// TODO Check if request is logged, then send error and ask for logout
