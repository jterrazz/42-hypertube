import axios from 'axios'
import * as _ from 'lodash'

import config from '../config'
import { SearchParams } from '../controllers'
import { magnetToHash } from './popcornAPI'

/*
 * https://yts.lt/api
 */

const YTS_BASE_URL = 'https://yts.lt/api/v2'
const ytsClient = axios.create({ baseURL: YTS_BASE_URL })

ytsClient.interceptors.request.use(request => {
  request.params.api_key = config.API_YTS_KEY
  return request
})

/*
 * Translates the format used by the external YTS API to our internal format.
 */

const ytsMovieSerializer = getTorrents => original => {
  if (typeof original != 'object') return null
  if (getTorrents) {
    return {
      torrents: original.torrents,
    }
  }

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
    torrents: getTorrents ? original.torrents : null,
    played: false,
  }
}

const popcornTorrentSerializer = original => {
  if (typeof original != 'object') return null

  return {
    seeds: original.seeds,
    peers: original.peers,
    size: original.size_bytes,
    url: original.url,
    hash: magnetToHash(original.url), // TODO Not like that, its a url
  }
}

/*
 * YTS API calls
 */

export const searchMovies = async (query, page, options) => {
  const res = await ytsClient.get('list_movies.json', { params: { query_term: query, sort_by: 'date', limit: 20 } })
  const movies = _.get(res, 'data.data.movies', [])

  return Array.isArray(movies) ? movies.map(ytsMovieSerializer(false)) : []
}

export const getMostDownloadedMovies = async () => searchMovies(null, 1, SearchParams.SORT_TRENDING_COUNT) // Trending is download_count for yts

// TODO Replace by open video api to get cast, actors etc etc
export const getMovieDetails = async imdbID => {
  const movies = await searchMovies(imdbID, 1, null)
  return movies.length ? movies[0] : null
}

export const getMovieTorrents = async imdbID => {
  const res = await ytsClient.get('list_movies.json', { params: { query_term: imdbID } })
  const movies = _.get(res, 'data.data.movies')

  return movies && movies.length ? movies[0].torrents.map(popcornTorrentSerializer) : null
}
