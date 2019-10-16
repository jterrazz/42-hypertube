import * as Router from 'koa-router'
import { getMeController, getUsernameController, updateMeController } from '../controllers'
import { isUser } from '../middlewares/auth'

const userRouter = new Router()

userRouter.get('/me', getMeController)
userRouter.patch('/me', isUser, updateMeController)
userRouter.get('/users/:username', getUsernameController)

export default userRouter
