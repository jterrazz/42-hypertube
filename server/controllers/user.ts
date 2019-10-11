import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import * as _ from 'lodash'

import { User } from '../models'

export const PUBLIC_USER_PROPS = [
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
  ctx.body = _.pick(ctx.state.user, PUBLIC_USER_PROPS)
}

export const getUsernameController: Middleware = async ctx => {
  const usernameValidator = Joi.string().required()
  const { value: username } = await usernameValidator.validate(ctx.params.username)

  const user = await User.findOne({ username })
  ctx.assert(user, 404, 'User not found')
  ctx.body = _.pick(user, PUBLIC_USER_PROPS)
}

// TODO Handle hashed password
// TODO Add maximum for each field

export const updateMeController: Middleware = async ctx => {
  const userSchema = Joi.object()
    .keys({
      username: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(6),
      firstName: Joi.string(),
      lastName: Joi.string(),
      language: Joi.string().allow('fr', 'en'),
    })
    .required()

  const { value: userInput } = await userSchema.validate(ctx.request.body)
  await User.updateOne({ _id: ctx.state.user._id }, userInput)
if (userInput.password) {
    const user = await User.findOne({ _id: ctx.state.user._id })
    await user.savePassword(userInput.password)
    await user.save()
}
ctx.status = 200
}
