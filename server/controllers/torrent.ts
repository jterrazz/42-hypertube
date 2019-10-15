import { Middleware } from 'koa'
import * as torrentStream from 'torrent-stream'

/*
 ** A torrent magnet link is composed only by two important fields: a hash of the files and a list of trackers that handles sharing of of ip addresses.
 ** We only need to store the hashes to identify and connect to peers.
 */

export const getTorrentStreamController: Middleware = ctx => {
  // TODO Bad input format check for hash
  const magnet =
    'magnet:?xt=urn:btih:426ec6d01964bac82c0da451b8e67842608fcc61&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.ccc.de%3A80'
  const hash = '426ec6d01964bac82c0da451b8e67842608fcc61'
  const engine = torrentStream(magnet, { path: `./public/${hash}` })

  return new Promise((resolve, reject) => {
    // TODO Add reject
    engine.on('ready', function() {
      // TODO By size take 1st .video
      engine.files.forEach(function(file) {
        console.log('filename:', file.name)
        const stream = file.createReadStream() //only on video
        // stream is readable stream to containing the file content
        // ctx.body = {
        //   yo: 'test',
        //   files: engine.files,
        // }
        ctx.body = stream
        resolve()
      })
    })
  })
}
