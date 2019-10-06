import { Middleware } from 'koa'

export const successfulAuthController: Middleware = async ctx => {
  ctx.body = {
    message: 'Authentication successful',
    user: ctx.state.user,
  }
}
