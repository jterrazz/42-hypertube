import * as Router from 'koa-router'

import { isUser } from '../middlewares/auth'
import {
  searchMoviesController,
  getMovieController,
  hotMoviesController,
  getMovieTorrentsController,
  getMovieCommentsController,
  addMovieCommentController,
  addMoviePlayController,
  getMovieSubtitlesController,
  getMovieSubtitleController,
} from '../controllers'

const movieRouter = new Router()

movieRouter
  .use(isUser)
  .get('/search', searchMoviesController)
  .get('/hot', hotMoviesController)
  .get('/:imdbId', getMovieController)
  .get('/:imdbId/torrents', getMovieTorrentsController)
  .get('/:imdbId/subtitles', getMovieSubtitlesController)
  .get('/:imdbId/subtitles/:lang', getMovieSubtitleController)
  .get('/:imdbId/comments', getMovieCommentsController)
  .post('/:imdbId/comments', addMovieCommentController)
  .post('/:imdbId/play', addMoviePlayController)

export default movieRouter
