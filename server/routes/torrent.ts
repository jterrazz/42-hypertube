import * as Router from 'koa-router'

import { getTorrentStreamController } from '../controllers'

const router = new Router()

router.get('/torrents/:hash/stream', getTorrentStreamController)

export default router
