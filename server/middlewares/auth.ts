import { Middleware } from 'koa'

/*
TODO Document the behaviour of authComplete and explain isUser middlewares
 */

export const isUser: Middleware = async (ctx, next) => {
  ctx.assert(ctx.state.user, 403, 'This action requires user authentication')
  await next()
}

export const checkProfileCompleted: Middleware = async (ctx, next) => {
  const user = ctx.state.user

  if (user && (!user.firstName || !user.lastName || !user.email)) {
    return ctx.throw(412, 'The user need to complete profile information')
  }
  await next()
}
