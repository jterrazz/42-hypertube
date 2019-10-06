import * as Router from 'koa-router'

import {
  addVideoCommentController,
  getMeController,
  getUsernameController,
  getVideoCommentsController,
  findMoviesController,
  getVideoTorrentsController,
  updateMeController,
  addTorrentPlayController,
} from '../controllers'
import { isUser } from '../middlewares/auth'
import authRouter from './auth'

const router = new Router()

router.use(authRouter.routes()).use(authRouter.allowedMethods())

router.get('/me', getMeController)
router.patch('/me', isUser, updateMeController)
router.get('/users/:username', getUsernameController)

router.get('/search', findMoviesController)
// TODO Explain format of videoid (can be imdb or string)
// TODO Rename route
router.get('/torrents/search/:query', getVideoTorrentsController)

// We save comments based on the torrentHash
router.get('/torrents/:hash/comments', getVideoCommentsController)
router.post('/torrents/:hash/comments', isUser, addVideoCommentController)
router.post('/torrents/:hash/play', isUser, addTorrentPlayController)

export default router
