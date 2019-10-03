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

export const router = new Router()

router.post('/auth/mail', authUsernameController)

router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), ctx => {
  ctx.body = 'yo'
})

router.get('/me', getMeController)
router.get('/users/:username', getUsernameController)
router.post('/users', addUserController)
router.patch('/users/:userId', updateUserId)

// TODO Add tv shows ??
router.get('/search/movies', findMoviesController)
// TODO Explain format of videoid (can be imdb or string)
router.get('/videos/:videoId/torrents', getVideoTorrentsController)
// Should interactions be saved per torrent or per video group ?
router.get('/videos/:videoId/comments', getVideoCommentsController)
router.post('/videos/:videoId/comments', addVideoCommentController)
// router.post('/videos/:videoId/lastseen', addVideoCommentController)
