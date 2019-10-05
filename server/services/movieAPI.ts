import axios from 'axios'
import * as _ from 'lodash'

import config, { MOVIE_ID_PREFIX_YTS } from '../config'

const ytsClient = axios.create({ baseURL: 'https://yts.lt/api/v2' })

ytsClient.interceptors.request.use(request => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  request.params = { ...request.params, api_key: config.APIS.THE_MOVIE_DB_KEY }
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
        m.id = `${MOVIE_ID_PREFIX_YTS}${m.id}`
        return m
      }),
    }
  }
  return { page, results: [] }
}
