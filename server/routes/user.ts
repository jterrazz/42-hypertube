import * as Router from 'koa-router'
import { getMeController, getUsernameController, updateMeController } from '../controllers'
import { isUser } from '../middlewares/auth'
import { cacheFileMiddleware } from '../middlewares/file-uploads'

const userRouter = new Router()

userRouter
  .use(isUser)
  .get('/me', getMeController)
  .patch('/me', cacheFileMiddleware, updateMeController)
  .get('/users/:username', getUsernameController)

export default userRouter
