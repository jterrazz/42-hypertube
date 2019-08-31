import * as Router from 'koa-router'
import {
  addUserController,
  addVideoCommentController,
  getUserIdController,
  getVideoCommentsController,
  getVideosController,
  getVideoTorrentsController,
  signInController,
  updateUserId,
} from './controllers'

export const router = new Router()

router.get('/auth', signInController)

router.get('/users/:userId', getUserIdController)
router.post('/users', addUserController)
router.patch('/users/:userId', updateUserId)

router.get('/videos', getVideosController)
router.get('/videos/:videoId/torrents', getVideoTorrentsController)
router.get('/videos/:videoId/comments', getVideoCommentsController)
router.post('/videos/:videoId/comments', addVideoCommentController)
