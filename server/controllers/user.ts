import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import * as _ from 'lodash'

import { User } from '../models'

export const PUBLIC_USER_PROPS = ['profilePicture', 'language', 'firstName', 'lastName', 'username']

export const PRIVATE_USER_PROPS = ['email', '_id', 'plays', ...PUBLIC_USER_PROPS]

export const getMeController: Middleware = async ctx => {
  ctx.body = _.pick(ctx.state.user, PRIVATE_USER_PROPS)
}

export const getUsernameController: Middleware = async ctx => {
  const usernameValidator = Joi.string().required()
  const username = await usernameValidator.validateAsync(ctx.params.username)

  const user = await User.findOne({ username })
  ctx.assert(user, 404, 'User not found')
  ctx.body = _.pick(user, PUBLIC_USER_PROPS)
}

export const updateMeController: Middleware = async ctx => {
  const userSchema = Joi.object()
    .keys({
      username: Joi.string().max(42),
      email: Joi.string().email(),
      password: Joi.string().min(8),
      firstName: Joi.string().max(42),
      lastName: Joi.string().max(42),
      language: Joi.string().valid('fr', 'en'),
    })
    .required()

  const userInput = await userSchema.validateAsync(ctx.request.body)
  await User.updateOne({ _id: ctx.state.user._id }, userInput)
  if (userInput.password) {
    const user = await User.findOne({ _id: ctx.state.user._id })
    await user.savePassword(userInput.password)
    await user.save()
  }
  ctx.status = 200
}
