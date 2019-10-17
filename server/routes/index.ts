import * as Router from 'koa-router'

import authRouter from './auth'
import userRouter from './user'
import torrentRouter from './torrent'
import movieRouter from './movie'

/*
 * The use of sub-routers allows to better separate the logic of same type routes.
 */

const router = new Router()

router
  .use('/movies', movieRouter.routes(), movieRouter.allowedMethods())
  .use('/auth', authRouter.routes(), authRouter.allowedMethods())
  .use('/torrents', torrentRouter.routes(), torrentRouter.allowedMethods())
  .use(userRouter.routes(), userRouter.allowedMethods())

export default router
