import * as torrentStream from 'torrent-stream'
import { Middleware } from 'koa'

/*
 ** Explain how a magnet link works
 */

export const streamHashController: Middleware = ctx => {
  // TODO Bad input format for hash
  const magnet =
    'magnet:?xt=urn:btih:426ec6d01964bac82c0da451b8e67842608fcc61&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.ccc.de%3A80'
  const hash = '426ec6d01964bac82c0da451b8e67842608fcc61'
  const engine = torrentStream(magnet, { path: `./public/${hash}` })

  return new Promise((resolve, reject) => {
    // TODO Add reject
    engine.on('ready', function() {
      engine.files.forEach(function(file) {
        console.log('filename:', file.name)
        var stream = file.createReadStream()
        // stream is readable stream to containing the file content
        ctx.body = {
          yo: 'test',
          files: engine.files,
        }
        resolve()
      })
    })
  })
}
