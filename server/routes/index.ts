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

router.get('/torrents/search/:query', getVideoTorrentsController)
router.get('/torrents/:hash/comments', getVideoCommentsController)
router.post('/torrents/:hash/comments', isUser, addVideoCommentController)
router.post('/torrents/:hash/play', isUser, addTorrentPlayController)

export default router
