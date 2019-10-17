import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import * as _ from 'lodash'
import * as OS from 'opensubtitles-api'
import axios from 'axios'
import * as fs from 'fs'
import * as srt2vtt from 'srt2vtt'

import * as ytsApi from '../services/ytsAPI'
import * as popcornAPI from '../services/popcornAPI'
import * as tmdbAPI from '../services/tmdbAPI'
import { Movie, User } from '../models'

const OpenSubtitles = new OS({
  useragent: 'NodeJS',
  ssl: true,
})

/*
 * All the search params are centralized here.
 * Build example: const param = SORT_TITLE | SORT_REVERSE
 * Test example: if (param & SORT_TITLE)
 */

const addPlayToMovie = user => movie => {
  if (movie && user && user.plays) {
    movie.played = user.plays.find(x => x.videoId == movie.imdb_id)
  }
  return movie
}

/*
 * Controllers
 */

const MOVIE_GENRES = [
  'comedy',
  'sci-fi',
  'horror',
  'romance',
  'action',
  'thriller',
  'drama',
  'mystery',
  'crime',
  'animation',
  'adventure',
  'fantasy',
  'comedy-romance',
  'action-comedy',
  'superhero',
]

export const SearchParamsEnum = {
  SORT_TITLE: 'title',
  SORT_ADDED: 'date_added',
  SORT_TRENDING: 'trending',
  SORT_RATING: 'rating',
  SORT_YEAR: 'year',
}

export const searchMoviesController: Middleware = async ctx => {
  const querySchema = Joi.object().keys({
    query: Joi.string().required(),
    page: Joi.number().positive(),
    sort: Joi.string().valid(...Object.values(SearchParamsEnum)),
    genre: Joi.string().valid(...MOVIE_GENRES),
    reverse: Joi.string().valid('true', 'false'),
    source: Joi.string().valid('yts', 'popcorn'),
  })

  const { query, page, sort, genre, reverse, source } = await querySchema.validateAsync(ctx.query)
  let movies = null

  if (source == 'popcorn') {
    movies = await popcornAPI.searchMovies(query, page, { sort, genre, reverse })
  } else {
    movies = await ytsApi.searchMovies(query, page, { sort, genre, reverse })
  }

  ctx.body = {
    page,
    movies: movies.map(addPlayToMovie(ctx.state.user)),
  }
}

export const hotMoviesController: Middleware = async ctx => {
  const genre = await Joi.string()
    .valid(...MOVIE_GENRES)
    .validateAsync(ctx.query.genre)

  const results = await Promise.all([ytsApi.getMostDownloadedMovies(genre), popcornAPI.getTrendingMovies(genre)])

  ctx.body = {
    rankedMovies: {
      yts: results[0].map(addPlayToMovie(ctx.state.user)),
      popcorn: results[1].map(addPlayToMovie(ctx.state.user)),
    },
  }
}

// TODO Convert to have the same keys + add url paths
export const getMovieController: Middleware = async ctx => {
  const movie =
    await tmdbAPI.getMovieDetails(ctx.params.imdbId, ctx.state.user.language) || await popcornAPI.getMovieDetails(ctx.params.imdbId) || await ytsApi.getMovieDetails(ctx.params.imdbId)
  ctx.body = {
    movie: addPlayToMovie(ctx.state.user)(movie),
  }
}

export const getMovieTorrentsController: Middleware = async ctx => {
  const popcornTorrents = await popcornAPI.getMovieTorrents(ctx.params.imdbId)
  const ytsTorrents = await ytsApi.getMovieTorrents(ctx.params.imdbId)

  ctx.body = {
    popcorn: popcornTorrents,
    yts: ytsTorrents,
  }
}

const publicCommentProperties = [
  '_id',
  'text',
  'date',
  'user.username',
  'user.firstName',
  'user.lastName',
  'user.profilePicture',
]

export const getMovieCommentsController: Middleware = async ctx => {
  const imdbId = ctx.params.imdbId

  const movie = await Movie.findOne({ imdbId }).populate('comments.user')
  ctx.body = {
    comments: movie ? movie.comments.map(el => _.pick(el, publicCommentProperties)) : [],
  }
}

/*
 * Parameters: String imdbID, String lang
 */
export const getMovieSubtitlesController: Middleware = async ctx => {
  const imbdId = ctx.params.imdbId

  const subtitles = await OpenSubtitles.search({ imdbid: imbdId })
  ctx.body = { subtitles }
}

export const getMovieSubtitleController: Middleware = ctx => {
  return new Promise(async (resolve, reject) => {
    try {
      const imdbId = ctx.params.imdbId
      const lang = await Joi.string()
        .valid('en', 'fr')
        .required()
        .validateAsync(ctx.params.lang)

      const filename = imdbId + '-' + lang + '.vtt'
      const filepath = `${__dirname}/../public/subtitles/${filename}`

      ctx.body = { url: `/public/subtitles/${filename}` }

      fs.stat(filepath, async (err, _) => {
        try {
          if (err == null) {
            return resolve()
          } else if (err.code === 'ENOENT') {
            const subtitles = await OpenSubtitles.search({ imdbid: imdbId })
            ctx.assert(subtitles[lang], 404, "This subtitle doesn't exist")

            const { data: srtSubtitle } = await axios.get(subtitles[lang].url)

            srt2vtt(srtSubtitle, (err, vttSubtitle) => {
              if (err) return reject(err)

              fs.writeFile(filepath, vttSubtitle, err => {
                if (err) return reject(err)

                return resolve()
              })
            })
          } else {
            return reject(err)
          }
        } catch (err) {
          return reject(err)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

export const addMovieCommentController: Middleware = async ctx => {
  const imdbId = ctx.params.imdbId
  const textSchema = Joi.string().max(500)

  const text = await textSchema.validateAsync(ctx.request.body.text)

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
