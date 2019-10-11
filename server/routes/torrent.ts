import {
    addTorrentPlayController,
    addVideoCommentController,
    getVideoCommentsController,
  getVideoTorrentsController,
} from "../controllers";

import {isUser} from "../middlewares/auth";
import {streamHashController} from "../controllers/stream";
import * as Router from 'koa-router'

const router = new Router()

router.get('/torrents/search/:query', getVideoTorrentsController)
router.get('/torrents/:hash/comments', getVideoCommentsController)
router.post('/torrents/:hash/comments', isUser, addVideoCommentController)
router.get('/torrents/:hash/stream', streamHashController) // isUser
router.post('/torrents/:hash/play', isUser, addTorrentPlayController)

export default router
