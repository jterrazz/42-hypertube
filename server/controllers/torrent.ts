import { Middleware } from 'koa'
import * as torrentStream from 'torrent-stream'
import * as fs from 'fs'
import * as ffmpeg from 'fluent-ffmpeg'
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const PassThrough = require('stream').PassThrough

import { Torrent } from '../models'
import logger from '../utils/logger'

ffmpeg.setFfmpegPath(ffmpegPath)

// They both use a static list of trackers
const TRACKERS = [
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
      .on('error', err => {
        pass.end()
      })
      .pipe(pass)
  } else {
    inputStream.pipe(pass)
  }
}

/*
 * A torrent magnet link is composed only by two important fields: a hash of the files and a list of trackers that handles sharing of of ip addresses.
 * We only need to store the hashes to identify and connect to peers.
 */

export const getTorrentStreamController: Middleware = ctx => {
  const hash = ctx.params.hash
  ctx.assert(hash.length == 40, 404, 'Badly formatted hash')

  const folderPath = __dirname + `/../public/torrents/${hash}`
  const magnet = 'magnet:?xt=urn:btih:' + hash + '&tr=udp://' + TRACKERS.join('&tr=udp://')
  const engine = torrentStream(magnet, { path: folderPath })

  return new Promise((resolve, reject) => {
    engine
      .on('error', err => logger.error)
      .on('ready', async () => {
        try {
          if (!engine.files.length)
            return reject()

          const files = engine.files.sort((a, b) => {
            return a.length > b.length ? -1 : 1
          })

          const originalMovieStream = files[0].createReadStream()

          const torrent = await Torrent.findOneAndUpdate({ hash }, { lastRead: new Date() }, { new: true })
          if (!torrent) {
            const newTorrent = new Torrent({ hash, lastRead: new Date() })
            await newTorrent.save()
          }

          const moviePath = folderPath + '/' + files[0].path
          const fileExtension = moviePath.split('.').pop()
          let tries = 0

          const intervalId = setInterval(() => {
            fs.stat(moviePath, (_, stats) => {
              if (!stats) return

              const filesize = stats.size

              if (tries > 100) {
                clearInterval(intervalId)
              } else if (filesize > files[0].length / 100) {
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
