import * as Router from 'koa-router'

import { isUser } from '../middlewares/auth'
import {
  searchMoviesController,
  getMovieController,
  hotMoviesController,
  getMovieTorrentsController,
  getMovieCommentsController,
  addMovieCommentController,
  addTorrentPlaytimeController,
  getMovieSubtitlesController,
  getMovieSubtitleController,
} from '../controllers'

const movieRouter = new Router()

movieRouter.get('/search', searchMoviesController)
movieRouter.get('/hot', hotMoviesController)
movieRouter.get('/:imdbId', isUser, getMovieController)
movieRouter.get('/:imdbId/torrents', isUser, getMovieTorrentsController)
movieRouter.get('/:imdbId/subtitles', isUser, getMovieSubtitlesController)
movieRouter.get('/:imdbId/subtitles/:lang', isUser, getMovieSubtitleController)
movieRouter.get('/:imdbId/comments', isUser, getMovieCommentsController)
movieRouter.post('/:imdbId/comments', isUser, addMovieCommentController)
movieRouter.post('/:imdbId/play', isUser, addTorrentPlaytimeController)

export default movieRouter
