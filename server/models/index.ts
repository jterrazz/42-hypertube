import * as mongoose from 'mongoose'

mongoose.set('useFindAndModify', false)

export * from './user'
export * from './movie'
export * from './torrent'
