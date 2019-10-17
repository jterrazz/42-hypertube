import { Middleware } from 'koa'

/*
 * Use these middleware methods to limit the access of a route based on the authentication state.
 */

export const isUser: Middleware = async (ctx, next) => {
  ctx.assert(ctx.state.user, 403, 'This action requires user authentication')
  await next()
}

// TODO Remove if not used
// Document the behaviour of authComplete
// export const checkProfileCompleted: Middleware = async (ctx, next) => {
//   const user = ctx.state.user
//
//   if (user && (!user.firstName || !user.lastName || !user.email)) {
//     return ctx.throw(412, 'The user need to complete profile information')
//   }
//   await next()
// }
