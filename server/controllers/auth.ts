import { Middleware } from 'koa'
import * as _ from 'lodash'

import { PUBLIC_USER_PROPS } from './user'

export const successfulAuthController: Middleware = async ctx => {
  ctx.body = {
    message: 'Authentication successful',
    user: _.pick(ctx.state.user, PUBLIC_USER_PROPS),
  }
}
