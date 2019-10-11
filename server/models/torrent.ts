import { Schema, model } from 'mongoose'

const TorrentSchema = new Schema({
  hash: String,
  downloaded: Boolean,
  comments: [
    {
      text: String,
      user: { type: Schema.Types.ObjectId, ref: 'users' }, // TODO Not working
      date: Date,
    },
  ],
})

export const Torrent: any = model('torrents', TorrentSchema)
