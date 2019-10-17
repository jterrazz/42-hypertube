import axios from 'axios'
import * as _ from 'lodash'

import config from '../config'
import { SearchParamsEnum } from '../controllers'

/*
 * Documentation
 * https://yts.lt/api
 */

const YTS_BASE_URL = 'https://yts.lt/api/v2'
const ytsClient = axios.create({ baseURL: YTS_BASE_URL })

ytsClient.interceptors.request.use(request => {
  if (request.params)
    request.params.api_key = config.API_YTS_KEY
  else
    request.params = { api_key: config.API_YTS_KEY }
  return request
})

/*
 * Translates the format used by the external YTS API to our internal format.
 */

class YtsSerializer {
  static movie = getTorrents => original => {
    if (typeof original != 'object') return null

    return {
      title: original.title_english || original.title,
      imdb_id: original.imdb_code,
      year: original.year,
      rating: original.rating,
      runtime: original.runtime,
      genres: original.genres,
      summary: original.summary,
      yt_trailer_id: original.yt_trailer_code,
      fanart_image: original.background_image,
      poster_image: original.large_cover_image,
      played: false,
    }
  }

  static torrent = original => {
    if (typeof original != 'object') return null

    return {
      seeds: original.seeds,
      peers: original.peers,
      size: original.size_bytes,
      url: original.url,
      hash: original.url.substr(original.url.length - 40),
    }
  }
}

/*
 * YTS API calls
 * Options: { }
 * Match to https://yts.lt/api#list_movies
 */

export const searchMovies = async (query, page, options) => {
  const { genre, sort, reverse } = options

  const params = {
    query_term: query,
    order_by: reverse ? 'asc' : 'desc',
    sort_by: sort,
    limit: 20,
    genre,
    page,
  }

  switch (options.sort) {
    case SearchParamsEnum.SORT_ADDED:
      params.sort_by = 'trending'
      break
    case SearchParamsEnum.SORT_TRENDING:
      params.sort_by = 'download_count'
      break
    case SearchParamsEnum.SORT_RATING:
      params.sort_by = 'rating'
      break
    case SearchParamsEnum.SORT_YEAR:
      params.sort_by = 'year'
      break
    default:
      params.sort_by = 'title'
      break
  }

  const res = await ytsClient.get('list_movies.json', { params })
  const movies = _.get(res, 'data.data.movies', [])

  return Array.isArray(movies) ? movies.map(YtsSerializer.movie(false)) : []
}

export const getMostDownloadedMovies = async genre =>
  searchMovies(null, 1, { genre, sort: SearchParamsEnum.SORT_TRENDING }) // Trending is download_count for yts

export const getMovieDetails = async imdbID => {
  const movies = await searchMovies(imdbID, 1, null)
  return movies.length ? movies[0] : null
}

export const getMovieTorrents = async imdbID => {
  const res = await ytsClient.get('list_movies.json', { params: { query_term: imdbID } })
  const movies = _.get(res, 'data.data.movies')

  return movies && movies.length ? movies[0].torrents.map(YtsSerializer.torrent) : null
}
