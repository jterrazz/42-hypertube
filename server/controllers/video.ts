import { Middleware } from 'koa'
import * as Joi from 'joi'

import * as tmbApi from '../services/movieAPI'

export const findMoviesController: Middleware = async ctx => {
  const querySchema = Joi.object()
    .keys({
      query: Joi.string().required(),
      page: Joi.number(),
    })
    .required()

  const query = await Joi.validate(ctx.query, querySchema)
  try {
    ctx.body = {
      results: await tmbApi.findMovies(query.query, query.page)
    }
  } catch (err) {
    ctx.statusCode = 500
    ctx.message = 'Internal error querying the movie database'
  }
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
