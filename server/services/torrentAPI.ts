// eslint-disable-next-line @typescript-eslint/no-var-requires
const tg = require('torrent-grabber')

export const searchTPB = async query => {
  await tg.activate('ThePirateBay')
  return tg.search(query, { groupByTracker: false })
}
