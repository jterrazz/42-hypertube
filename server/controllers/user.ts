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
  'plays',
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

// TODO If we validate email, we need to verify it if we change it
// TODO Handle hashed password

export const updateMeController: Middleware = async ctx => {
  const userSchema = Joi.object()
    .keys({
      username: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(6),
      firstName: Joi.string(),
      lastName: Joi.string(),
    })
    .required()

  const { value: userInput } = await userSchema.validate(ctx.request.body)
  await User.updateOne({ _id: ctx.state.user._id }, userInput)
  ctx.status = 200
}
