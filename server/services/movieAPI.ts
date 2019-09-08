import axios from 'axios'

import config from '../config'

const ytsClient = axios.create({ baseURL: 'https://yts.lt/api/v2' })

ytsClient.interceptors.request.use(request => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  request.params = { ...request.params, api_key: config.APIS.THE_MOVIE_DB_KEY }
  return request
})

// TODO Add language
// TODO Maybe add series
export const findMovies = async (query, page) => {
  const res = await ytsClient.get(`list_movies.json`, { params: { query, page } })
  return res.data
}
