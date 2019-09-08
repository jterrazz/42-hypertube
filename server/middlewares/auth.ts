import { Middleware } from 'koa'
import * as _ from 'lodash'

export enum Roles {
  User = 'user',
  Anonymous = 'anonymous',
}

export const isUser: Middleware = ctx => {
  const role = _.get(ctx, 'state.user.role')
  ctx.assert(role === Roles.User, 403, 'This action requires user authentication')
}
