import { Middleware } from 'koa'
import * as torrentStream from 'torrent-stream'
import * as fs from 'fs'

import { Torrent } from '../models'

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
    engine.on('ready', async () => {
      try {
        if (!engine.files.length) {
          return reject()
        }

        const files = engine.files.sort((first, second) => {
          if (first.length > second.length) {
            return -1
          }
          return 1
        })

        const movieFileStream = files[0].createReadStream()

        const torrent = await Torrent.findOneAndUpdate({ hash }, { lastRead: new Date() }, { new: true })
        if (!torrent) {
          const newTorrent = new Torrent({ hash, lastRead: new Date() })
          await newTorrent.save()
        }

        const moviePath = folderPath + '/' + files[0].path

        const intervalId = setInterval(() => {
          fs.stat(moviePath, (_, stats) => {
            if (!stats)
              return

            const filesize = stats.size

            if (filesize > 30 * 1024 * 1024) {
              clearInterval(intervalId)
              ctx.body = movieFileStream
              resolve()
            }
          })
        }, 2000)
      } catch (e) {
        return reject(e)
      }
    })
  })
}
