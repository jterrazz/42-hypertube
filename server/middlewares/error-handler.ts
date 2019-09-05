import { Middleware } from 'koa'

export const errorMiddleware: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    // TODO Send only know errors else could leak data else 500 code internal error
    ctx.status = err.statusCode || 400
    ctx.message = err.message
    ctx.app.emit('error', err, ctx)
  }
}
