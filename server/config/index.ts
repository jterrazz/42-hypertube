import * as Joi from 'joi'
import logs from '../utils/logger'
import * as dotenv from 'dotenv'

dotenv.config()

const envValidator = Joi.object()
  .keys({
    NODE_ENV: Joi.string().allow(['development', 'production']),
    PORT: Joi.number().required(),
  })
  .unknown()

const { error, value: envValues } = Joi.validate(process.env, envValidator)

if (error) {
  logs.error('Environment variable error')
  throw error
}

export default {
  SERVER: {
    PORT: envValues.PORT,
  },
  IS_DEV: envValues.NODE_ENV != 'production',
  BCRYPT_COST: 10
}
