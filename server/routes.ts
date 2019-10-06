import * as Router from 'koa-router'
import * as passport from 'koa-passport'
import {
  addUserController,
  addVideoCommentController,
  getMeController,
  getUsernameController,
  getVideoCommentsController,
  findMoviesController,
  getVideoTorrentsController,
  authUsernameController,
  updateUserId,
} from './controllers'

const router = new Router()

router.post('/auth/username', authUsernameController)

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'],
  }),
)
router.get('/auth/google/callback', passport.authenticate('google'), ctx => {
  ctx.body = {
    message: 'Authentication successful',
    user: ctx.state.user,
  }
})

// TODO Add Facebook Authentication

router.get('/me', getMeController)
router.get('/users/:username', getUsernameController)
router.post('/users', addUserController)
router.patch('/users/:userId', updateUserId)

// TODO Add tv shows ??
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
