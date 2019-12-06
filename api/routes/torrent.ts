import * as Router from 'koa-router'
import { getTorrentStreamController } from '../controllers'
import { isUser, userInfosCompleted } from '../middlewares/auth'

const torrentRouter = new Router()

torrentRouter
  .use(isUser)
  .use(userInfosCompleted)
  .get('/:hash/stream', getTorrentStreamController)

export default torrentRouter
