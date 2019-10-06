import { Schema, model } from 'mongoose'
import { User } from './user'

const TorrentSchema = new Schema({
  hash: String,
  comments: [
    {
      text: String,
      user: { type: Schema.Types.ObjectId, ref: 'torrents' }, // TODO Not working
      date: Date,
    },
  ],
})

export const Torrent: any = model('torrents', TorrentSchema)
