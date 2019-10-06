import { Middleware } from 'koa'
import * as _ from 'lodash'

/*
TODO Document the behaviour of authComplete and explain isUser middlewares
 */

export enum Roles {
  User = 'user',
  Anonymous = 'anonymous',
}

export const isUser: Middleware = ctx => {
  const role = _.get(ctx, 'state.user.role')
  ctx.assert(role === Roles.User, 403, 'This action requires user authentication')
}

export const checkProfileCompleted: Middleware = ctx => {
  const user = ctx.state.user

  if (user && (!user.firstName || !user.lastName || !user.email)) {
    ctx.throw(412, 'The user need to complete profile informations')
  }
}
