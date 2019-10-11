import * as Router from 'koa-router'

import {
  addTorrentPlaytimeController,
  addTorrentCommentController,
  getTorrentCommentsController,
  getVideoTorrentsController,
  getTorrentStreamController,
} from '../controllers'
import { isUser } from '../middlewares/auth'

const router = new Router()

router.get('/torrents/search/:query', getVideoTorrentsController)
router.get('/torrents/:hash/comments', getTorrentCommentsController)
router.post('/torrents/:hash/comments', isUser, addTorrentCommentController)
router.get('/torrents/:hash/stream', getTorrentStreamController) // TODO isUser
router.post('/torrents/:hash/play', isUser, addTorrentPlaytimeController)

export default router
