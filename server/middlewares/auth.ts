import { Middleware } from 'koa'

/*
 * Middleware methods to limit the access of a route based on the authentication state.
 */

export const isUser: Middleware = async (ctx, next) => {
  ctx.assert(ctx.state.user, 403, 'This action requires user authentication')
  await next()
}
