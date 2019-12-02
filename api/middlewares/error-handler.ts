import { Middleware } from 'koa'
import logger from '../utils/logger'

export const errorMiddleware: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.isJoi) {
      ctx.status = 422
      ctx.message = err.message
    } else if (err.isPassable || err.statusCode || err.code == 'invalid_grant') {
      ctx.status = err.statusCode || 400
      ctx.message = err.message
    } else {
      ctx.status = 500
      ctx.message = 'Internal server error'
      logger.error(err) // TODO Hide
    }
  }
}