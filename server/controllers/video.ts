import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'

import * as ytsApi from '../services/ytsAPI'
import * as tpbAPI from '../services/tpbAPI'

export const hotMoviesController: Middleware = async ctx => {
  // TODO with real data
  const body = {
    topMovies: {
      yts: [{ id: 2, title: 'blyat movie' }],
    },
  }
  ctx.body = body
}

// TODO Check viewed torrents
export const findMoviesController: Middleware = async ctx => {
  const querySchema = Joi.object()
    .keys({
      query: Joi.string().required(),
      page: Joi.number().positive(),
    })
    .required()

  const { value: query } = await querySchema.validate(ctx.query)
  try {
    const movies = await ytsApi.findMovies(query.query, query.page)
    movies.results.forEach(m => {
      if (ctx.state.user && ctx.state.user.plays) m.played = ctx.state.user.plays.find(x => x.videoId == m.id)
    })
    ctx.body = movies
  } catch (err) {
    ctx.throw(500, 'Internal error while querying the movie database')
  }
}

export const getMovieController: Middleware = async ctx => {
  const tmp = {
    yo: 'yo'
  }
  ctx.body = tmp
}

// TODO Add viewed torrents
export const getVideoTorrentsController: Middleware = async ctx => {
  /*
   ** Accepts type: id
   */
  const query = ctx.params.query
  const isId = ctx.query.type === 'id'

  if (isId) {
    // TODO Plogan, here we need to query the YTS API (using the movieAPI service)
    // From it, we get the title (to later use with other torrent sources) + torrents from YTS
  } else {
    // Simple Yts search
  }

  const tpbResults = await tpbAPI.searchTPB(query)
  tpbResults.forEach(r => {
    r.hash = r.trackerId.replace('magnet:?xt=urn:btih:', '').split('&')[0]
    if (ctx.state.user && ctx.state.user.plays) r.played = ctx.state.user.plays.find(x => x.hash === r.hash)
  })

  ctx.body = {
    tpb: tpbResults,
  }
}
