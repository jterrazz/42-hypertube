/*
 * Controllers handles all the logic for routes.
 * The method usually access the request data inside the ctx object.
 * It then sends the data back to the client using the ctx.body or ctx.status.
 */

export * from './user'
export * from './movie'
export * from './auth'
export * from './torrent'
