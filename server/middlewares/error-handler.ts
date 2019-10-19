import { Middleware } from 'koa'

export const errorMiddleware: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.isJoi) {
      ctx.status = 422
      ctx.message = err.message
    } else if (err.isPassable || err.statusCode) {
      ctx.status = err.statusCode
      ctx.message = err.message
    } else {
      ctx.status = 500
      ctx.message = 'Internal server error'
    }
  }
}
