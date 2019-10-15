import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import * as _ from 'lodash'

import { PUBLIC_USER_PROPS } from './user'
import {sendResetPasswordEmail} from "../services/mail";

export const successfulAuthController: Middleware = async ctx => {
  ctx.body = {
    message: 'Authentication successful',
    user: _.pick(ctx.state.user, PUBLIC_USER_PROPS),
  }
}

export const resetPasswordController: Middleware = async ctx => {
  const { value: email } = await Joi.string()
    .email()
    .required()
    .validate(ctx.query.email)

  await sendResetPasswordEmail(email)
  ctx.status = 200
}
