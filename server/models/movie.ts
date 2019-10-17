import { Schema, model } from 'mongoose'

const MovieSchema = new Schema({
  imdbId: String,
  comments: [
    {
      text: String,
      user: { type: Schema.Types.ObjectId, ref: 'users' },
      date: Date,
    },
  ],
})

export const Movie: any = model('movies', MovieSchema)
