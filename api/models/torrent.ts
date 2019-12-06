import { Schema, model } from 'mongoose'

const TorrentSchema = new Schema({
  hash: String,
  lastRead: Date,
})

export const Torrent = model('torrents', TorrentSchema)
