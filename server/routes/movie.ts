import * as Router from 'koa-router'

import {
  searchMoviesController,
  getMovieController,
  hotMoviesController,
  getMovieTorrentsController,
  getMovieCommentsController,
  addMovieCommentController,
  addTorrentPlaytimeController,
} from '../controllers'

import { isUser } from '../middlewares/auth'

const router = new Router()

router.get('/movies/search', searchMoviesController)
router.get('/movies/hot', hotMoviesController)
router.get('/movies/:imdbID', getMovieController)
router.get('/movies/:imdbID/torrents', getMovieTorrentsController)
router.get('/movies/:imdbId/comments', getMovieCommentsController)
router.post('/movies/:imdbId/comments', isUser, addMovieCommentController)
router.post('/movies/:imdbId/play', isUser, addTorrentPlaytimeController)

export default router
