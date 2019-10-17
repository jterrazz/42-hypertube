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
  if (request.params)
    request.params.api_key = config.API_THE_MOVIE_DB_KEY
  else
    request.params = { api_key: config.API_THE_MOVIE_DB_KEY }
  return request
})

/*
 * Translates the format received used by the external Popcorn API to our internal format.
 */

// class tmdbSerializer {
//   static movie = original => {
//     if (typeof original != 'object') return null
//
//     return {
//       title: original.title_english || original.title,
//       imdb_id: original.imdb_id,
//       year: Number(original.year),
//       rating: _.get(original, 'rating.percentage') / 10,
//       runtime: Number(original.runtime),
//       genres: original.genres,
//       summary: original.synopsis,
//       yt_trailer_id: original.trailer,
//       fanart_image: _.get(original, 'images.fanart'),
//       poster_image: _.get(original, 'images.banner'),
//       played: false,
//     }
//   }
// }

/*
 * We need search because no imdbid
 */

export const getMovieDetails = async (imdbID, language) => {
  const { data } = await tmdbClient.get(`/find/${imdbID}`, { params: { external_source: 'imdb_id' }})
  const movieId = _.get(data, 'movie_results[0].id')
  if (!movieId) return null

  const { data: movie } = await tmdbClient.get(`/movie/${movieId}`, { params: { language: language, append_to_response: 'credits,images,similar,reviews' } })
  return movie
}
