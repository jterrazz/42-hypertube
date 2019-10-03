import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'

import * as tmbApi from '../services/movieAPI'
import * as torrentAPI from '../services/torrentAPI'

// TODO Add  REST Paging
export const findMoviesController: Middleware = async ctx => {
  const querySchema = Joi.object()
    .keys({
      query: Joi.string().required(),
      page: Joi.number(),
    })
    .required()

  const query = await querySchema.validate(ctx.query)
  try {
    ctx.body = {
      results: await tmbApi.findMovies(query.query, query.page),
    }
  } catch (err) {
    ctx.statusCode = 500
    ctx.message = 'Internal error querying the movie database'
  }
}

export const getVideoTorrentsController: Middleware = async ctx => {
  ctx.body = {
    tpb: await torrentAPI.searchTPB(ctx.params.videoId),
  }
}

export const getVideoCommentsController = () => {
  return 0
}

export const addVideoCommentController = () => {
  return 0
}
