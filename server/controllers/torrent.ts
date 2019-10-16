import { Middleware } from 'koa'
import * as torrentStream from 'torrent-stream'
import { Torrent } from '../models'

/*
 * A torrent magnet link is composed only by two important fields: a hash of the files and a list of trackers that handles sharing of of ip addresses.
 * We only need to store the hashes to identify and connect to peers.
 */

export const getTorrentStreamController: Middleware = ctx => {
  const trackers = [
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

  const hash = ctx.params.hash
  ctx.assert(hash.length == 40, 404, 'Badly formatted hash')
  const magnet = 'magnet:?xt=urn:btih:' + hash + '&tr=udp://' + trackers.join('&tr=udp://')
  const engine = torrentStream(magnet, { path: `./public/torrents/${hash}` })

  return new Promise((resolve, reject) => {
    // TODO Handle error
    engine.on('ready', () => {
      // TODO By size take 1st .video
      engine.files.forEach(async file => {
        const stream = file.createReadStream()

        try {
          const torrent = await Torrent.findOneAndUpdate({ hash }, { lastRead: new Date() }, { new: true })
          if (!torrent) {
            const newTorrent = Torrent({ hash, lastRead: new Date() })
            await newTorrent.save()
          }
        } catch (e) {
          return reject(e)
        }

        // ctx.body = stream
        resolve()
      })
    })
  })
}
