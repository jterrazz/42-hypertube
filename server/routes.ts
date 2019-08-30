import * as Router from 'koa-router'
import { userController } from './controllers'

export const router = new Router()

router.get('/users/:userId', userController)
