import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import * as _ from 'lodash'
import * as jwt from 'jsonwebtoken'

import config from '../config'
import { User } from '../models'
import { PRIVATE_USER_PROPS, serializeUser } from './user'
import { sendResetPasswordEmail } from '../services/mail'
import { ClientError } from '../services/auth'

export const addIncompleteProfile = async user => {
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
    await userSchema.validateAsync(user)
    user.profileCompleted = true
    return user
  } catch (err) {
    user.profileCompleted = false
    return user
  }
}

/*
 * Authentication controllers
 */

export const successfulAuthController: Middleware = async ctx => {
  ctx.body = {
    message: 'Authentication successful',
    user: _.pick(await addIncompleteProfile(serializeUser(ctx.state.user)), PRIVATE_USER_PROPS),
  }
}

export const successfulAuthRedirectController: Middleware = async ctx => {
  ctx.redirect(`${config.CLIENT_URL}/`)
}

export const logoutController: Middleware = (ctx: any) => {
  ctx.logout()
  ctx.status = 200
}

/*
 * Reset controllers
 */

export const sendResetEmailController: Middleware = async ctx => {
  const querySchema = Joi.object().keys({
    username: Joi.string().required(),
  })

  const { username } = await querySchema.validateAsync(ctx.query)
  const user = await User.findOne({ username })
  ctx.assert(user, 404, 'Username not found')

  return new Promise((resolve, reject) => {
    const tokenPayload = { username: username }
    jwt.sign(tokenPayload, config.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) return reject(err)

      sendResetPasswordEmail(user.email, token)
        .then(res => {
          ctx.status = 200
          resolve()
        })
        .catch(reject)
    })
  })
}

export const resetPasswordController: Middleware = async ctx => {
  const querySchema = Joi.object().keys({
    token: Joi.string()
      .max(500)
      .required(),
    password: Joi.string()
      .min(8)
      .max(100)
      .required(),
  })
  const { token, password } = await querySchema.validateAsync(ctx.request.body)

  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
      if (err) return reject(new ClientError(401, 'This authentication token is not valid'))

      try {
        const user = await User.findOne({ username: decoded.username })
        ctx.assert(user, 404, 'User not found')
        await user.savePassword(password)
        await user.save()
        ctx.status = 200
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  })
}
