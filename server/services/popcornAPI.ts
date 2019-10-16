import axios from 'axios'
import * as _ from 'lodash'
import { SearchParamsEnum } from '../controllers'

/*
 * Documentation
 * https://popcornofficial.docs.apiary.io/#reference/movie/get-page/page
 */

const POPCORN_BASE_URL = 'https://tv-v2.api-fetch.website'
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
      title: original.title_english || original.title,
      imdb_id: original.imdb_id,
      year: Number(original.year),
      rating: _.get(original, 'rating.percentage') / 10,
      runtime: Number(original.runtime),
      genres: original.genres,
      summary: original.synopsis,
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
 * option:
 * Match: https://popcornofficial.docs.apiary.io/#reference/movie/get-pages/page
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
    case SearchParamsEnum.SORT_ADDED:
      params.sort = 'updated'
      break
    case SearchParamsEnum.SORT_TRENDING:
      params.sort = 'trending'
      break
    case SearchParamsEnum.SORT_RATING:
      params.sort = 'rating'
      break
    case SearchParamsEnum.SORT_YEAR:
      params.sort = 'SORT_YEAR'
      break
    default:
      params.sort = 'title'
      break
  }

  const res = await popcornClient.get(`movies/${page || 1}`, { params })
  return _.get(res, 'data', []).map(PopcornSerializer.movie)
}

export const getTrendingMovies = async genre => searchMovies(null, 1, { genre, sort: SearchParamsEnum.SORT_TRENDING })

export const getMovieDetails = async imdbID => {
  const res = await popcornClient.get(`/movie/${imdbID}`)
  return PopcornSerializer.movie(res.data)
}

export const getMovieTorrents = async imdbID => {
  const res = await popcornClient.get(`/movie/${imdbID}`)
  const torrents = _.get(res, 'data.torrents.en')

  return Object.values(torrents).map(PopcornSerializer.torrent)
}
