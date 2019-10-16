import * as Router from 'koa-router'
import { getMeController, getUsernameController, updateMeController } from '../controllers'
import { isUser } from '../middlewares/auth'

const userRouter = new Router()

userRouter
  .use(isUser)
  .get('/me', getMeController)
  .patch('/me', updateMeController)
  .get('/users/:username', getUsernameController)

export default userRouter
