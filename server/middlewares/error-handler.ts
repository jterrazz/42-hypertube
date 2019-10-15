import { Middleware } from 'koa'

export const errorMiddleware: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.isPassable) {
      ctx.status = err.statusCode
      ctx.message = err.message
    } else {
      ctx.status = 500
      ctx.message = 'Internal server error'
      ctx.app.emit('error', err, ctx) // TODO RM ?
    }

  }
}
