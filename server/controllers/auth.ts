import { User } from '../models'
import { Middleware } from 'koa'
import * as Joi from '@hapi/joi'
import * as jwt from 'jsonwebtoken'
import config from '../config'

export const authUsernameController: Middleware = async ctx => {
  const userSchema = Joi.object()
    .keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    })
    .required()
  const userData = await userSchema.validate(ctx.request.body)
  const user = await User.findOne({ username: userData.username })

  ctx.assert(await user.authenticate(userData.password), 401, 'Bad credentials')

  const token = await jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + config.JWT_EXP_DELAY,
      data: 'foobar',
    },
    config.JWT_SECRET,
  )
  ctx.body = { token }
}
