import { Schema, model } from 'mongoose'

// TODO We can probably delete that
const TorrentSchema = new Schema({
  hash: String,
  downloaded: Boolean,
})

export const Torrent: any = model('torrents', TorrentSchema)
