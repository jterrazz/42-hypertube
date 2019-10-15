import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'

import * as ytsApi from '../services/ytsAPI'
import * as tpbAPI from '../services/tpbAPI'
import * as popcornAPI from "../services/popcornAPI";

// TODO Maybe translate titles etc
// TODO Add viewed torrents

/*
 * All the search params are centralized here.
 * Build example: const param = SORT_TITLE | SORT_REVERSE
 * Test example: if (param & SORT_TITLE)
 */

export enum SearchParams {
  SORT_TITLE = 0x00000001,
  SORT_DATE = 0x00000010,
  SORT_TRENDING_COUNT = 0x00000100,
  SORT_REVERSE = 0x00001000,
}

const addPlayToMovie = user => movie => {
  if (user && user.plays) {
    movie.played = user.plays.find(x => x.videoId == movie.imdb_id)
  }
  return movie
}

/*
 * Controllers
 */

export const hotMoviesController: Middleware = async ctx => {
  const results = await Promise.all([ytsApi.getMostDownloadedMovies(), popcornAPI.getTrendingMovies()])

  ctx.body = {
    rankedMovies: {
      yts: results[0].map(addPlayToMovie(ctx.state.user)),
      popcorn: results[1].map(addPlayToMovie(ctx.state.user)),
    },
  }
}

// TODO If error is axios then throw error 500
export const searchMoviesController: Middleware = async ctx => {
  const querySchema = Joi.object()
    .keys({
      query: Joi.string().required(),
      page: Joi.number().positive(),
    })
    .required()

  const {
    value: { query, page },
  } = await querySchema.validate(ctx.query)
  const movies = await ytsApi.searchMovies(query, page, null)

  ctx.body = {
    page,
    movies: movies.map(addPlayToMovie(ctx.state.user))
  }
}

export const getMovieController: Middleware = async ctx => {
  const movie =
    (await popcornAPI.getMovieDetails(ctx.params.imdbID)) || (await ytsApi.getMovieDetails(ctx.params.imdbID))
  ctx.body = {
    movie: addPlayToMovie(ctx.state.user)(movie),
  }
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
