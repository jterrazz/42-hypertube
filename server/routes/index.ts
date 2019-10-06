import * as Router from 'koa-router'
import authRouter from './auth'
import {
  addVideoCommentController,
  getMeController,
  getUsernameController,
  getVideoCommentsController,
  findMoviesController,
  getVideoTorrentsController,
  updateMeController,
} from '../controllers'

const router = new Router()

router.use(authRouter.routes()).use(authRouter.allowedMethods())

router.get('/me', getMeController)
router.get('/users/:username', getUsernameController)
router.patch('/users/:userId', updateMeController)

router.get('/search/movies', findMoviesController)
// TODO Explain format of videoid (can be imdb or string)
// TODO Rename route
router.get('/videos/:videoId/torrents', getVideoTorrentsController)

// We save comments based on the torrentHash
router.get('/torrents/:torrentHash/comments', getVideoCommentsController)
router.post('/torrents/:torrentHash/comments', addVideoCommentController)

// We save played movies based on the torrentHash and the movieId if available
// router.post('/me/played', addVideoCommentController)

export default router
