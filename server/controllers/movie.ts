import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import * as _ from 'lodash'

import * as ytsApi from '../services/ytsAPI'
import * as popcornAPI from '../services/popcornAPI'
import {Movie, User} from "../models";

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

export const getMovieTorrentsController: Middleware = async ctx => {
  const popcornTorrents = await popcornAPI.getMovieTorrents(ctx.params.imdbID)
  const ytsTorrents = await ytsApi.getMovieTorrents(ctx.params.imdbID)

  ctx.body = {
    popcorn: popcornTorrents,
    yts: ytsTorrents,
  }
}

const publicCommentProperties = ['_id', 'text', 'date']

export const getMovieCommentsController: Middleware = async ctx => {
  const imdbId = ctx.params.imdbId

  const movie = await Movie.findOne({ imdbId }).populate('comments.user')
  ctx.body = {
    comments: movie ? movie.comments.map(el => _.pick(el, publicCommentProperties)) : [],
  }
}

// TODO Add maximum for each field
export const addMovieCommentController: Middleware = async ctx => {
  const imdbId = ctx.params.imdbId
  const textSchema = Joi.string().max(500)

  const { value: text } = await textSchema.validate(ctx.request.body.text)

  ctx.assert(text, 422, 'Data is missing the comment text')

  const newComment = { text, date: new Date(), user: ctx.state.user._id }
  const torrent = await Movie.findOneAndUpdate({ imdbId }, { $push: { comments: newComment } }, { new: true })
  if (!torrent) {
    const newTorrent = new Movie({ imdbId, comments: [newComment] })
    await newTorrent.save()
  }
  ctx.body = {
    comment: _.pick(newComment, publicCommentProperties),
  }
}

export const addTorrentPlaytimeController: Middleware = async ctx => {
  const play = {
    createdAt: new Date(),
    imdbId: ctx.params.imdbId,
  }

  const me = await User.findOneAndUpdate({ _id: ctx.state.user._id }, { $push: { plays: play } })
  ctx.assert(me, 500, 'Error adding the torrent play time') // TODO Use real http code
  ctx.status = 200
}
