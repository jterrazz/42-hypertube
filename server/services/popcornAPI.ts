import axios from 'axios'
import * as _ from 'lodash'
import {SearchParams} from "../controllers";

const POPCORN_BASE_URL = 'https://tv-v2.api-fetch.website'
const popcornClient = axios.create({ baseURL: POPCORN_BASE_URL })

/*
 * Translates the format received used by the external Popcorn API to our internal format
 */

const popcornMovieSerializer = withTorrents => original => {
  if (typeof original != 'object')
    return null
  return {
    title: original.title_english || original.title,
    imdb_id: original.imdb_id,
    year: original.year,
    rating: _.get(original, '.rating.percentage') / 10,
    runtime: original.runtime,
    genres: original.genres,
    summary: original.synopsis,
    yt_trailer_id: original.trailer,
    fanart_image: _.get(original, '.poster.fanart'),
    poster_image: _.get(original, '.poster.banner'),
    torrents: withTorrents ? original.torrents : null,
    played: false
  }
}

/*
 * Popcorn-time API calls
 */

export const getTrendingMovies = async () => searchMovies(null, 1, SearchParams.SORT_TRENDING_COUNT)

export const searchMovies = async (query, page, options) => {
  const params: any = { order: -1, genre: 'all' }

  switch (options) {
    case SearchParams.SORT_TRENDING_COUNT:
      params.sort = 'trending'
  }

  const res = await popcornClient.get(`movies/${page || 1}`, { params })
  return _.get(res, 'data', []).map(popcornMovieSerializer(false))
}

export const getMovieDetails = async imdbID => {
  const res = await popcornClient.get(`/movie/${imdbID}`)
  return popcornMovieSerializer(false)(res.data)
}
