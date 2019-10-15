import * as Router from 'koa-router'

import authRouter from './auth'
import userRouter from './user'
import torrentRouter from './torrent'
import videoRouter from './movie'

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
