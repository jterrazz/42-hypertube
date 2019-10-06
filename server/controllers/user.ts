import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import * as _ from 'lodash'

import { User } from '../models'

export const publicUserProperties = [
  'profilePicture',
  'language',
  'firstName',
  'lastName',
  'email',
  'profilePicture',
  'username',
  '_id',
]

export const getMeController: Middleware = async ctx => {
  ctx.body = _.pick(ctx.state.user, publicUserProperties)
}

export const getUsernameController: Middleware = async ctx => {
  const usernameValidator = Joi.string().required()
  const { value: username } = await usernameValidator.validate(ctx.params.username)

  const user = await User.findOne({ username })
  ctx.assert(user, 404, 'User not found')
  ctx.body = _.pick(user, publicUserProperties)
}

export const updateMeController = () => {}
