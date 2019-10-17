import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import * as _ from 'lodash'
import * as jwt from 'jsonwebtoken'

import config from '../config'

import { PRIVATE_USER_PROPS } from './user'
import { sendResetPasswordEmail } from '../services/mail'
import { User } from '../models'
import { ClientError } from "../services/auth";

export const successfulAuthController: Middleware = async ctx => {
  ctx.body = {
    message: 'Authentication successful',
    user: _.pick(ctx.state.user, PRIVATE_USER_PROPS),
  }
}

export const sendResetEmailController: Middleware = async ctx =>
  new Promise((resolve, reject) => {
    const querySchema = Joi.object().keys({
      username: Joi.string().required(),
    })

    querySchema
      .validateAsync(ctx.query)
      .then(({ username }) => {
        User.findOne({ username })
          .then(user => {
            if (!user) {
              return reject(new ClientError(404, 'Username not found'))
            }

            const tokenPayload = { username: username }
            jwt.sign(tokenPayload, config.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
              if (err) {
                return reject(err)
              }

              sendResetPasswordEmail(user.email, token)
                .then(res => {
                  ctx.status = 200
                  resolve()
                })
                .catch(reject)
            })
          })
          .catch(reject)
      })
      .catch(reject)
  })

export const resetPasswordController: Middleware = async ctx =>
  new Promise((resolve, reject) => {
    const querySchema = Joi.object().keys({
      token: Joi.string()
        .max(500)
        .required(),
      password: Joi.string()
        .min(8)
        .max(100)
        .required(),
    })

    const {
      error,
      value: { token, password },
    } = querySchema.validate(ctx.query)

    if (error) return reject(error)

    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
      if (err) return reject(new ClientError(401, 'This authentication token is not valid'))

      try {
        const user = await User.findOne({ username: decoded.username })
        await user.savePassword(password)
        await user.save()
        ctx.status = 200
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  })
