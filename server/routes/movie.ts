import * as Router from 'koa-router'

import {
  searchMoviesController,
  getMovieController,
  hotMoviesController,
  getMovieTorrentsController,
  getTorrentCommentsController,
  addTorrentCommentController,
  addTorrentPlaytimeController,
} from '../controllers'

import { isUser } from '../middlewares/auth'

const router = new Router()

router.get('/movies/search', searchMoviesController)
router.get('/movies/hot', hotMoviesController)
router.get('/movies/:imdbID', getMovieController)
router.get('/movies/:imdbID/torrents', getMovieTorrentsController)
router.get('/torrents/:hash/comments', getTorrentCommentsController)
router.post('/torrents/:hash/comments', isUser, addTorrentCommentController)
router.post('/torrents/:hash/play', isUser, addTorrentPlaytimeController)

export default router
