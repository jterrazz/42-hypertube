import { Middleware } from 'koa'
import * as Joi from 'joi'
import * as _ from 'lodash'

import { User } from '../models'

const publicUserProperties = ['username', 'email', 'name', 'language']

export const getMeController: Middleware = async ctx => {
  const username = 'jterrazz'
  const user = await User.findOne({ username })

  ctx.assert(user, 404, 'User not found') // TODO Maybe send disconnect code
  ctx.body = _.pick(user, publicUserProperties)
}

export const getUsernameController: Middleware = async ctx => {
  const usernameValidator = Joi.string().required()
  const username = await Joi.validate(ctx.params.username, usernameValidator)

  const user = await User.findOne({ username })
  ctx.assert(user, 404, 'User not found')
  ctx.body = _.pick(user, publicUserProperties)
}

export const addUserController: Middleware = async ctx => {
  const userValidator = Joi.object()
    .keys({
      username: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .required(),
      name: Joi.object({
        first: Joi.string().required(),
        last: Joi.string().required(),
      }).required(),
    })
    .required()

  const userInput = await Joi.validate(ctx.request.body, userValidator)
  const user = await new User(userInput)
  await user.savePassword(userInput.password)
  await user.save()
  // TODO Check mongodb errors (validation or others) dont come here to avoid leak
  // TODO Handle duplicate mongodb

  ctx.status = 200
}

export const updateUserId = () => {}
