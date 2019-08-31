import * as bcrypt from 'bcryptjs'
import * as Joi from 'joi'
import * as Koa from 'Koa'

import config from '../config'

export const getUserIdController = () => {
  return 'ok'
}

export const addUserController: Koa.Middleware = async ctx => {
  const userValidator = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  })
  const userInput = await Joi.validate(ctx.request.body, userValidator)
  console.log(ctx.request.body)
  console.log(userInput)

  // const hashedPwd = await bcrypt.hash(password, config.BCRYPT_COST)
  // console.log(hashedPwd)
  ctx.state = 200
}

export const updateUserId = () => {}
