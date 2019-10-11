import axios from 'axios'
import * as _ from 'lodash'

import config from '../config'

const ytsClient = axios.create({ baseURL: 'https://yts.lt/api/v2' })

ytsClient.interceptors.request.use(request => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  request.params.api_key = config.API_YTS_KEY
  return request
})

// TODO Add language
export const findMovies = async (query, page) => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const res = await ytsClient.get(`list_movies.json`, { params: { query_term: query, page } })
  const movies = _.get(res, ['data', 'data', 'movies'])
  const pageNumber = _.get(res, ['data', 'data', 'page_number'])

  if (Array.isArray(movies)) {
    return {
      page: pageNumber,
      results: movies.map(m => {
        delete m.torrents
        delete m.url
        return m
      }),
    }
  }
  return { page, results: [] }
}

export const getMovieDetails = async movieId => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const res = await ytsClient.get('movie_details.json', { params: { movie_id: 12 } })
}
