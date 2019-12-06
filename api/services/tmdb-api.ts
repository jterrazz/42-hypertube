import axios from 'axios'
import * as _ from 'lodash'

import config from '../config'

/*
 * Documentation
 * https://developers.themoviedb.org/3/getting-startedhttps://popcornofficial.docs.apiary.io/#reference/movie/get-page/page
 */

const BASE_URL = 'https://api.themoviedb.org/3'
const tmdbClient = axios.create({ baseURL: BASE_URL })

tmdbClient.interceptors.request.use(request => {
  if (request.params) request.params.api_key = config.API_THE_MOVIE_DB_KEY
  else request.params = { api_key: config.API_THE_MOVIE_DB_KEY }
  return request
})

/*
 * Translates the format received used by the external Popcorn API to our internal format.
 */

const ROOT_URL = 'https://image.tmdb.org/t/p/original'
class TmdbSerializer {
  static movie = original => {
    if (typeof original != 'object') return null

    const youtubeTailer = original.videos ? original.videos.results.filter(el => el.type == 'Trailer')[0] : null
    return {
      title: original.title,
      imdb_id: original.imdb_id,
      release_date: original.release_date,
      rating: original.vote_average,
      runtime: original.runtime,
      genres: original.genres,
      overview: original.overview,
      yt_trailer_id: youtubeTailer ? youtubeTailer.key : null,
      fanart_image: ROOT_URL + original.backdrop_path,
      poster_image: ROOT_URL + original.poster_path,
      played: false,
      similar: _.get(original, 'similar.results', []).map(el => TmdbSerializer.movie(el)),
      cast: _.get(original, 'credits.cast', []).map(el => {
        el.profile_path = ROOT_URL + el.profile_path
        return el
      }),
    }
  }
}

/*
 * We need search because we don't have the tmdbId only the imdbid
 * https://developers.themoviedb.org/3/getting-started/append-to-response
 */

export const getMovieDetails = async (imdbID, language) => {
  try {
    const { data } = await tmdbClient.get(`/find/${imdbID}`, { params: { external_source: 'imdb_id' } })
    const movieId = _.get(data, 'movie_results[0].id')
    if (!movieId) return null

    const { data: movie } = await tmdbClient.get(`/movie/${movieId}`, {
      params: { language: language, append_to_response: 'videos,credits,images,similar,reviews' },
    })
    return TmdbSerializer.movie(movie)
  } catch (e) {
    if (e.response.status < 500) {
      return null
    }
    throw e
  }
}
