import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'

import * as tmbApi from '../services/movieAPI'
import * as torrentAPI from '../services/torrentAPI'
import { MOVIE_ID_PREFIX_YTS, MOVIE_ID_PREFIX_QUERY } from '../config'

// TODO Add  REST Paging
export const findMoviesController: Middleware = async ctx => {
  const querySchema = Joi.object()
    .keys({
      query: Joi.string().required(),
      page: Joi.number().positive(),
    })
    .required()

  const { value: query } = await querySchema.validate(ctx.query)
  try {
    const movies = await tmbApi.findMovies(query.query, query.page)

    ctx.body = movies
  } catch (err) {
    ctx.throw(500, 'Internal error while querying the movie database')
  }
}

export const getVideoTorrentsController: Middleware = async ctx => {
  const videoIdSchema = Joi.object()
    .keys({
      videoId: Joi.string().required(),
    })
    .required()

  let movieQuery = null
  const {
    value: { videoId },
  } = await videoIdSchema.validate(ctx.params)

  // TODO Add viewed torrents
  if (videoId.startsWith(MOVIE_ID_PREFIX_YTS)) {
    const id = videoId.substring(MOVIE_ID_PREFIX_YTS.length)
    // TODO Plogan, here we need to query the YTS API (using the movieAPI service)
    // From it, we get the title (to later use with other torrent sources) + torrents from YTS
    movieQuery = 'Snowden'
  } else if (videoId.startsWith(MOVIE_ID_PREFIX_QUERY)) {
    movieQuery = videoId.substring(MOVIE_ID_PREFIX_QUERY.length)
  } else {
    ctx.throw(400, 'Id format is not valid') // TODO Replace with real HTTP code
  }

  ctx.body = {
    tpb: await torrentAPI.searchTPB(movieQuery),
  }
}

export const getVideoCommentsController = () => {
  return 0
}

export const addVideoCommentController = () => {
  return 0
}
