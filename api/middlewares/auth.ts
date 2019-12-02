import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import { ClientError } from '../services/auth'

/*
 * Middleware methods to limit the access of a route based on the authentication state.
 */

export const isUser: Middleware = async (ctx, next) => {
  ctx.assert(ctx.state.user, 403, 'This action requires user authentication')
  await next()
}

export const userInfosCompleted = async (ctx, next) =>
  new Promise((resolve, reject) => {
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

    userSchema
      .validateAsync(ctx.state.user)
      .then(async () => {
        try {
          await next()
          resolve()
        } catch (err) {
          reject(err)
        }
      })
      .catch(err => {
        reject(new ClientError(422, 'The user must complete its profile. ' + err.message))
      })
  })
