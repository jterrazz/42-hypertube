import * as Router from 'koa-router'

import { findMoviesController } from '../controllers'
import authRouter from './auth'
import userRouter from './user'
import torrentRouter from './torrent'

const router = new Router()

router
  .use(authRouter.routes())
  .use(authRouter.allowedMethods())
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())
  .use(torrentRouter.routes())
  .use(torrentRouter.allowedMethods())

router.get('/search', findMoviesController)

export default router
