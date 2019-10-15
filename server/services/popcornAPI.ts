import axios from 'axios'
import * as _ from 'lodash'
import {SearchParams} from "../controllers";

const POPCORN_BASE_URL = 'https://tv-v2.api-fetch.website'
const popcornClient = axios.create({ baseURL: POPCORN_BASE_URL })

/*
 * Translates the format received used by the external Popcorn API to our internal format.
 */

// TODO Maybe refactor both
const popcornMovieSerializer = getTorrents => original => {
  if (typeof original != 'object')
    return null
  if (getTorrents) {
    return {
      torrents: original.torrents
    }
  }

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
    torrents: getTorrents ? original.torrents : null,
    played: false
  }
}

// TODO Place in global file
export const magnetToHash = magnet => {
  return magnet.replace('magnet:?xt=urn:btih:', '').split('&')[0]
}

const popcornTorrentSerializer = original => {
  if (typeof original != 'object') return null

  return {
    seeds: original.seed,
    peers: original.peer,
    size: original.filesize,
    url: original.url,
    hash: magnetToHash(original.url),
  }
}

/*
 * Popcorn-time API calls
 */

export const searchMovies = async (query, page, options) => {
  const params: any = { order: -1, genre: 'all' }

  switch (options) {
    case SearchParams.SORT_TRENDING_COUNT:
      params.sort = 'trending'
  }

  const res = await popcornClient.get(`movies/${page || 1}`, { params })
  return _.get(res, 'data', []).map(popcornMovieSerializer(false))
}

export const getTrendingMovies = async () => searchMovies(null, 1, SearchParams.SORT_TRENDING_COUNT)

export const getMovieDetails = async imdbID => {
  const res = await popcornClient.get(`/movie/${imdbID}`)
  return popcornMovieSerializer(false)(res.data)
}

export const getMovieTorrents = async imdbID => {
  const res = await popcornClient.get(`/movie/${imdbID}`)
  const ret = popcornMovieSerializer(true)(res.data)

  return Object.values(ret.torrents.en).map(popcornTorrentSerializer)
}
