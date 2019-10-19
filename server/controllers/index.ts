/*
 * A controller handles the final logic for a route.
 * The method usually access the ctx.body or the ctx.request object, carrying the data coming from the client.
 * To send data back, we usually set the ctx.body with json. If we simply need to send a confirmation,
 * we set the http response code with the ctx.status property.
 */

export * from './user'
export * from './movie'
export * from './auth'
export * from './torrent'
