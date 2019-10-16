import * as Router from 'koa-router'
import { getTorrentStreamController } from '../controllers'
import { isUser } from '../middlewares/auth'

const torrentRouter = new Router()

torrentRouter.use(isUser).get('/:hash/stream', getTorrentStreamController)

export default torrentRouter
