import * as Router from 'koa-router'
import {
  addUserController,
  addVideoCommentController,
  getMeController,
  getUsernameController,
  getVideoCommentsController,
  getVideosController,
  getVideoTorrentsController,
  authUsernameController,
  updateUserId,
} from './controllers'

export const router = new Router()

router.post('/auth', authUsernameController)

router.get('/me', getMeController)
router.get('/users/:username', getUsernameController)
router.post('/users', addUserController)
router.patch('/users/:userId', updateUserId)

router.get('/videos', getVideosController)
router.get('/videos/:videoId/torrents', getVideoTorrentsController)
router.get('/videos/:videoId/comments', getVideoCommentsController)
router.post('/videos/:videoId/comments', addVideoCommentController)
