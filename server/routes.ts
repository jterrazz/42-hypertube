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
  console.log('success')
  ctx.body = 'yo'
})

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
