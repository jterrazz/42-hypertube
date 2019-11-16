import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import config from "../config";

/*
 * Middleware methods to limit the access of a route based on the authentication state.
 */

export const isUser: Middleware = async (ctx, next) => {
  ctx.assert(ctx.state.user, 403, 'This action requires user authentication')
  await next()
}

export const userInfosCompleted = async (ctx, next) => {
  const userSchema = Joi.object()
    .keys({
      username: Joi.required(),
      email: Joi.required(),
      firstName: Joi.required(),
      lastName: Joi.required(),
      profileImageName: Joi.required(),
    })
    .unknown()
    .required()

  try {
    await userSchema.validateAsync(ctx.state.user)
    await next()
  } catch (err) {
    ctx.throw(403, "The user must complete its profile. " + err.message)
  }
}
