import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import * as _ from 'lodash'
import * as OS from 'opensubtitles-api'
import * as fs from 'fs'
import * as srt2vtt from 'srt2vtt'
import axios from 'axios'
import * as sanatize from 'mongo-sanitize'

import * as ytsApi from '../services/yts-api'
import * as popcornAPI from '../services/popcorn-api'
import * as tmdbAPI from '../services/tmdb-api'
import { Movie, User } from '../models'
import { serializeUser } from './user'
import memoryCache from '../utils/cache'
import config from '../config'

const OpenSubtitlesClient = new OS({ useragent: 'NodeJS', ssl: true })

const SUBTITLE_LANGS = ['fr', 'en']

const GENRE_VALUES = [
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

const PUBLIC_COMMENT_PROPERTIES = [
  '_id',
  'text',
  'date',
  'user.username',
  'user.firstName',
  'user.lastName',
  'user.profileImageName',
  'user.profileImageUrl',
]

export const SORT_VALUES_ENUM = {
  SORT_TITLE: 'title',
  SORT_ADDED: 'date_added',
  SORT_TRENDING: 'trending',
  SORT_RATING: 'rating',
  SORT_YEAR: 'year',
}

const addPlayToMovie = user => movie => {
  if (movie && user && user.plays) {
    movie.played = !!user.plays.find(x => x.imdbId == movie.imdb_id)
  }
  return movie
}

/*
 * Controllers
 */

export const searchMoviesController: Middleware = async ctx => {
  const querySchema = Joi.object().keys({
    query: Joi.string().required(),
    page: Joi.number().positive(),
    sort: Joi.string().valid(...Object.values(SORT_VALUES_ENUM)),
    genre: Joi.string().valid(...GENRE_VALUES),
    reverse: Joi.string().valid('true', 'false'),
    source: Joi.string().valid('yts', 'popcorn'),
  })

  let { query, page, sort, genre, reverse, source } = await querySchema.validateAsync(ctx.query)
  reverse = reverse === 'true'
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
    .valid(...GENRE_VALUES)
    .validateAsync(ctx.query.genre)

  const results = await memoryCache.get(memoryCache.KEYS.HOT_MOVIES, genre, async () => {
    return Promise.all([ytsApi.getMostDownloadedMovies(genre), popcornAPI.getTrendingMovies(genre)])
  })
  ctx.body = {
    rankedMovies: {
      yts: results[0].map(addPlayToMovie(ctx.state.user)),
      popcorn: results[1].map(addPlayToMovie(ctx.state.user)),
    },
  }
}

export const getMovieController: Middleware = async ctx => {
  const movie = await memoryCache.get(memoryCache.KEYS.MOVIES, ctx.params.imdbId, async () => {
    return (
      (await tmdbAPI.getMovieDetails(ctx.params.imdbId, ctx.state.user.language)) ||
      (await popcornAPI.getMovieDetails(ctx.params.imdbId)) ||
      (await ytsApi.getMovieDetails(ctx.params.imdbId))
    )
  })

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

const downloadAndConvertSubtitle = (subtitles, imdbId, lang) =>
  new Promise((resolve, reject) => {
    const filename = imdbId + '-' + lang + '.vtt'
    const filepath = `${__dirname}/../public/subtitles/${filename}`

    fs.stat(filepath, async (err, _) => {
      try {
        if (err == null) {
          return resolve(filename)
        } else if (err.code === 'ENOENT') {
          const { data: srtSubtitle } = await axios.get(subtitles[lang].url)

          srt2vtt(srtSubtitle, (err, vttSubtitle) => {
            if (err) return reject(err)

            fs.writeFile(filepath, vttSubtitle, err => {
              if (err) return reject(err)

              return resolve(filename)
            })
          })
        } else {
          return reject(err)
        }
      } catch (err) {
        return reject(err)
      }
    })
  })

export const getMovieSubtitlesController: Middleware = async ctx => {
  const imbdId = ctx.params.imdbId
  const subtitles = await OpenSubtitlesClient.search({ imdbid: imbdId })
  const toDownload = []

  SUBTITLE_LANGS.forEach(lang => {
    if (subtitles[lang] && subtitles[lang].url) {
      const ft = async () => ({
        kind: 'subtitles',
        label: lang,
        srcLang: lang,
        src: `${config.CLIENT_URL}/subtitles/${await downloadAndConvertSubtitle(subtitles, imbdId, lang)}`,
      })
      toDownload.push(ft())
    }
  })

  ctx.body = {
    subtitles: await Promise.all(toDownload),
  }
}

export const getMovieCommentsController: Middleware = async ctx => {
  const imdbId = sanatize(ctx.params.imdbId)

  const movie = await Movie.findOne({ imdbId }).populate('comments.user')

  ctx.body = {
    comments: movie
      ? movie.comments
          .map((el: any) => {
            const serializedUser = serializeUser(el.user._doc)
            const data = _.pick(el, PUBLIC_COMMENT_PROPERTIES)

            const ret = { ...data }
            ret.user.profileImageUrl = serializedUser.profileImageUrl
            return ret
          })
          .sort((a, b) => a._id < b._id)
      : [],
  }
}

export const addMovieCommentController: Middleware = async ctx => {
  const imdbId = sanatize(ctx.params.imdbId)
  const textSchema = Joi.string()
    .min(5)
    .max(150)

  const text = await textSchema.validateAsync(ctx.request.body.text)

  ctx.assert(text, 422, 'Data is missing the comment text')

  const newComment = { text, date: new Date(), user: ctx.state.user._id }
  const torrent = await Movie.findOneAndUpdate({ imdbId }, { $push: { comments: newComment } }, { new: true })
  if (!torrent) {
    const newTorrent = new Movie({ imdbId, comments: [newComment] })
    await newTorrent.save()
  }
  newComment.user = serializeUser(ctx.state.user)
  ctx.body = {
    comment: _.pick(newComment, PUBLIC_COMMENT_PROPERTIES),
  }
}

export const addMoviePlayController: Middleware = async ctx => {
  const play = {
    createdAt: new Date(),
    imdbId: ctx.params.imdbId,
  }

  const me = await User.findOneAndUpdate({ _id: ctx.state.user._id }, { $push: { plays: play } })
  ctx.assert(me, 500, 'Error while adding the torrent play')
  ctx.status = 200
}
