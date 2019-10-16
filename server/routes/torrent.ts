import * as Router from 'koa-router'
import { getTorrentStreamController } from '../controllers'

const torrentRouter = new Router()

torrentRouter.get('/:hash/stream', getTorrentStreamController)

export default torrentRouter
