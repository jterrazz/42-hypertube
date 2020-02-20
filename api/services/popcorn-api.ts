import axios from 'axios'
import * as _ from 'lodash'
import { SORT_VALUES_ENUM } from '../controllers'

/*
 * Documentation
 * https://popcornofficial.docs.apiary.io/#reference/movie/get-page/page
 */

const POPCORN_BASE_URL = 'ADD YOUR SOURCE HERE'
const popcornClient = axios.create({ baseURL: POPCORN_BASE_URL })

const magnetToHash = magnet => {
  return magnet.replace('magnet:?xt=urn:btih:', '').split('&')[0]
}

/*
 * Translates the format received used by the external Popcorn API to our internal format.
 */

class PopcornSerializer {
  static movie = original => {
    if (typeof original != 'object') return null

    return {
      title: (original.title_english || original.title || '').replace('&amp;', '&'),
      imdb_id: original.imdb_id,
      release_date: original.year,
      rating: _.get(original, 'rating.percentage') / 10,
      runtime: Number(original.runtime),
      overview: (original.synopsis || '').replace('&amp;', '&'),
      yt_trailer_id: original.trailer,
      fanart_image: _.get(original, 'images.fanart'),
      poster_image: _.get(original, 'images.banner'),
      played: false,
    }
  }

  static torrent = original => {
    if (typeof original != 'object') return null

    return {
      seeds: original.seed,
      peers: original.peer,
      size: original.filesize,
      url: original.url,
      hash: magnetToHash(original.url),
    }
  }
}

/*
 * Popcorn-time API calls
 */

export const searchMovies = async (query, page, options) => {
  const { genre, sort, reverse } = options

  const params = {
    keywords: query,
    order: reverse ? '1' : '-1',
    sort: sort,
    genre,
  }

  switch (options.sort) {
    case SORT_VALUES_ENUM.SORT_ADDED:
      params.sort = 'updated'
      break
    case SORT_VALUES_ENUM.SORT_TRENDING:
      params.sort = 'trending'
      break
    case SORT_VALUES_ENUM.SORT_RATING:
      params.sort = 'rating'
      break
    case SORT_VALUES_ENUM.SORT_YEAR:
      params.sort = 'year'
      break
    default:
      params.sort = 'title'
      break
  }

  const res = await popcornClient.get(`movies/${page || 1}`, { params })
  return _.get(res, 'data', []).map(PopcornSerializer.movie)
}

export const getTrendingMovies = async genre => searchMovies(null, 1, { genre, sort: SORT_VALUES_ENUM.SORT_TRENDING })

export const getMovieDetails = async imdbID => {
  try {
    const res = await popcornClient.get(`/movie/${imdbID}`)
    return PopcornSerializer.movie(res.data)
  } catch (e) {
    if (e.response.status < 500) {
      return null
    }
    throw e
  }
}

export const getMovieTorrents = async imdbID => {
  try {
    const res = await popcornClient.get(`/movie/${imdbID}`)
    const torrents = _.get(res, 'data.torrents.en')
    return torrents ? Object.values(torrents).map(PopcornSerializer.torrent) : null
  } catch (e) {
    if (e.response.status < 500) {
      return null
    }
    throw e
  }
}
