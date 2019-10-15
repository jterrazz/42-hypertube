import { Middleware } from 'koa'
import * as torrentStream from 'torrent-stream'

/*
 ** A torrent magnet link is composed only by two important fields: a hash of the files and a list of trackers that handles sharing of of ip addresses.
 ** We only need to store the hashes to identify and connect to peers.
 */

export const getTorrentStreamController: Middleware = ctx => {
  // TODO Bad input format check for hash
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

  const hash = '426ec6d01964bac82c0da451b8e67842608fcc61'
  const magnet = 'magnet:?xt=urn:btih:' + hash + '&tr=udp://' + trackers.join('&tr=udp://')
  const engine = torrentStream(magnet, { path: `./public/torrents/${hash}` })

  return new Promise((resolve, reject) => {
    // TODO Handle error
    engine.on('ready', () => {
      // TODO By size take 1st .video
      engine.files.forEach((file) => {
        const stream = file.createReadStream()
        ctx.body = stream
        resolve()
      })
    })
  })
}
