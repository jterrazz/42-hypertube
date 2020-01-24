const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const PassThrough = require('stream').PassThrough
import { Middleware } from 'koa'
import * as torrentStream from 'torrent-stream'
import * as ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs'
import * as sanatize from 'mongo-sanitize'

import { Torrent } from '../models'
import logger from '../utils/logger'

ffmpeg.setFfmpegPath(ffmpegPath)

/*
 * The default list of trackers used by our two sources
 */

const DEFAULT_TRACKERS = [
  'glotorrents.pw:6969/announce',
  'tracker.opentrackr.org:1337/announce',
  'torrent.gresille.org:80/announce',
  'tracker.openbittorrent.com:80',
  'tracker.coppersurfer.tk:6969',
  'tracker.leechers-paradise.org:6969',
  'p4p.arenabg.ch:1337',
  'tracker.internetwarriors.net:1337',
  'open.demonii.com:1337/announce',
]

/*
 * Creates a web compatible video stream from any video stream
 */

const getConvertedStream = (inputStream, fileExtension) => {
  const pass = PassThrough()

  if (fileExtension != 'mp4' && fileExtension != 'webm') {
    ffmpeg()
      .input(inputStream)
      .outputOptions([
        '-f hls',
        '-deadline realtime',
        '-preset ultrafast',
        '-start_number 0',
        '-hls_time 2',
        '-hls_list_size 0',
        '-movflags frag_keyframe+empty_moov',
        '-g 52',
      ])
      .outputFormat('mp4')
      .on('error', _ => pass.end())
      .pipe(pass)
  } else {
    inputStream.pipe(pass)
  }
  return pass
}

const buildMagnet = async (hash: string, trackers: Array<string>) => {
  const tr = DEFAULT_TRACKERS

  if (Array.isArray(trackers)) {
    tr.concat(trackers)
  } else if (trackers) {
    tr.push(trackers)
  }

  return 'magnet:?xt=urn:btih:' + hash + '&tr=udp://' + tr.join('&tr=udp://')
}

/*
 * A torrent magnet link is composed by two important fields:
 * - the hash of the files
 * - a list of trackers that gives us the peers/seeders ips.
 */

export const getTorrentStreamController: Middleware = async ctx => {
  const hash = sanatize(ctx.params.hash)
  ctx.assert(hash.length == 40, 422, 'Badly formatted hash')
  const magnet = await buildMagnet(hash, ctx.query.tr)
  const folderPath = __dirname + `/../public/torrents/${ctx.params.hash}`
  const engine = torrentStream(magnet, { path: folderPath })

  return new Promise((resolve, reject) => {
    engine.on('error', () => {}).on('ready', async () => {
      try {
        if (!engine.files.length) return reject()

        const orderedFiles = engine.files.sort((a, b) => (a.length > b.length ? -1 : 1))
        const file = orderedFiles[0]
        const originalMovieStream = file.createReadStream()

        const torrent = await Torrent.findOneAndUpdate({ hash }, { lastRead: new Date() }, { new: true })
        if (!torrent) {
          const newTorrent = new Torrent({ hash, lastRead: new Date() })
          await newTorrent.save()
        }

        const moviePath = folderPath + '/' + file.path
        const fileExtension = moviePath.split('.').pop()
        let tries = 0

        const intervalId = setInterval(() => {
          fs.stat(moviePath, (_, stats) => {
            if (!stats) return

            const filesize = stats.size

            if (tries > 420) {
              clearInterval(intervalId)
            } else if (filesize > file.length / 100) {
              clearInterval(intervalId)
              ctx.body = getConvertedStream(originalMovieStream, fileExtension)
              return resolve()
            }
            tries++
          })
        }, 2000)
      } catch (e) {
        return reject(e)
      }
    })
  })
}
