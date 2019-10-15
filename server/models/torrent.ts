import { Schema, model } from 'mongoose'

const TorrentSchema = new Schema({
  hash: String,
  downloaded: Boolean,
})

export const Torrent: any = model('torrents', TorrentSchema)
