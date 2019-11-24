import * as Router from 'koa-router'

import authRouter from './auth'
import userRouter from './user'
import torrentRouter from './torrent'
import movieRouter from './movie'
import { statusController } from '../controllers'

/*
 * Divides the routes in multiple router for a better code structure.
 */

const router = new Router()

router
  .use('/movies', movieRouter.routes(), movieRouter.allowedMethods())
  .use('/auth', authRouter.routes(), authRouter.allowedMethods())
  .use('/torrents', torrentRouter.routes(), torrentRouter.allowedMethods())
  .use(userRouter.routes(), userRouter.allowedMethods())
  .use('/status', statusController)

export default router
