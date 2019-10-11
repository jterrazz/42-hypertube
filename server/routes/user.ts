import { getMeController, getUsernameController, updateMeController } from '../controllers'
import { isUser } from '../middlewares/auth'
import * as Router from 'koa-router'

const router = new Router()

router.get('/me', getMeController)
router.patch('/me', isUser, updateMeController)
router.get('/users/:username', getUsernameController)

export default router
