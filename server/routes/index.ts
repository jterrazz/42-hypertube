import * as Router from 'koa-router'

import authRouter from './auth'
import userRouter from './user'
import torrentRouter from './torrent'
import videoRouter from './movie'

/*
 * We use sub-routers to better separate the logic.
 * The main router is then attached to the main koa app.
 */

const router = new Router()

router
  .use(authRouter.routes())
  .use(authRouter.allowedMethods())
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())
  .use(torrentRouter.routes())
  .use(torrentRouter.allowedMethods())
  .use(videoRouter.routes())
  .use(videoRouter.allowedMethods())

export default router
