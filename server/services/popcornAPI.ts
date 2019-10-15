import axios from 'axios'
import * as _ from 'lodash'

const popcornClient = axios.create({ baseURL: 'https://tv-v2.api-fetch.website' })

// TODO Add cache for 1 hour
export const getTrendingMovies = async () => {
  const res = await popcornClient.get('movies/1', { params: { sort: 'trending', order: -1, genre: 'all' } })

  return _.get(res, 'data', []).map(el => {
    delete el.torrents
    return el
  })
}
