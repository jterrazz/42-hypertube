import * as findRemoveSync from 'find-remove'
import { Torrent } from '../models'
import logger from './logger'
import * as fs from 'fs'

const MAX_CACHE_AGE = 60 * 30
const CLEAR_CACHE_LOOP_TIME = 1000 * 60 * 10

const MAX_MOVIE_AGE = 24 * 60 * 60 * 1000 * 31
const CLEAR_OLD_MOVIES_LOOP_DELAY = 1000 * 60 * 5

/*
 * Cron jobs
 */

export const clearCacheJob = () =>
  setInterval(() => {
    findRemoveSync(__dirname + '/../cache', { prefix: 'upload', age: { seconds: MAX_CACHE_AGE } })
  }, CLEAR_CACHE_LOOP_TIME)

export const clearOldMoviesJob = () =>
  setInterval(async () => {
    try {
      const dateLimit = new Date()
      dateLimit.setTime(dateLimit.getTime() - MAX_MOVIE_AGE)

      const searchParams = { lastRead: { $lt: dateLimit } }
      const oldTorrents = await Torrent.find(searchParams)

      oldTorrents.forEach((torrent: any) => {
        fs.rmdir(__dirname + '/../public/torrents/' + torrent.hash, { recursive: true }, err => {})
      })

      await Torrent.deleteMany({ hash: { $in: oldTorrents.map((el: any) => el.hash) } })
    } catch (err) {
      logger.error(err)
    }
  }, CLEAR_OLD_MOVIES_LOOP_DELAY)
