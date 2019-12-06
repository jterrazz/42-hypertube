import * as Router from 'koa-router'
import { getMeController, getUsernameController, updateMeController, getUsersController } from '../controllers'
import { isUser, userInfosCompleted } from '../middlewares/auth'
import { cacheFileMiddleware } from '../middlewares/file-uploads'

const userRouter = new Router()

userRouter
  .use(isUser)
  .get('/me', getMeController)
  .patch('/me', cacheFileMiddleware, updateMeController)
  .get('/users', userInfosCompleted, getUsersController)
  .get('/users/:username', userInfosCompleted, getUsernameController)

export default userRouter
