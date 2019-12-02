import * as Router from 'koa-router'

import { isUser, userInfosCompleted } from '../middlewares/auth'
import {
  searchMoviesController,
  getMovieController,
  hotMoviesController,
  getMovieTorrentsController,
  getMovieCommentsController,
  addMovieCommentController,
  addMoviePlayController,
  getMovieSubtitlesController,
} from '../controllers'

const movieRouter = new Router()

movieRouter
  .use(isUser)
  .use(userInfosCompleted)
  .get('/search', searchMoviesController)
  .get('/hot', hotMoviesController)
  .get('/:imdbId', getMovieController)
  .get('/:imdbId/torrents', getMovieTorrentsController)
  .get('/:imdbId/subtitles', getMovieSubtitlesController)
  .get('/:imdbId/comments', getMovieCommentsController)
  .post('/:imdbId/comments', addMovieCommentController)
  .post('/:imdbId/play', addMoviePlayController)

export default movieRouter
