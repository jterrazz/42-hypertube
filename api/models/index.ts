import * as mongoose from 'mongoose'

/*
 * Unique indexes are defined during database initialisation in the mongo-init.js file
 */

mongoose.set('useFindAndModify', false)

export * from './user'
export * from './movie'
export * from './torrent'
