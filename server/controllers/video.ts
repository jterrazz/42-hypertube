import { Middleware } from 'koa'
import * as tmbApi from '../services/movieAPI'

export const findMoviesController: Middleware = async ctx => {
  // TODO Check empty queries ?
  ctx.body = await tmbApi.findMovies(ctx.query.query, ctx.query.page)
}

export const getVideoTorrentsController = () => {
  return 0
}

export const getVideoCommentsController = () => {
  return 0
}

export const addVideoCommentController = () => {
  return 0
}
