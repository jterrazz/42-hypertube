import * as Joi from 'joi'
import logs from '../utils/logger'
import * as dotenv from 'dotenv'

dotenv.config()

const envValidator = Joi.object()
  .keys({
    NODE_ENV: Joi.string().allow(['development', 'production']),
    PORT: Joi.number(),
  })
  .unknown()

const { error, value: envValues } = Joi.validate(process.env, envValidator)

if (error) {
  logs.error(`Environment variable error: ${error.message}`)
  process.exit(1)
}

export default {
  SERVER: {
    PORT: envValues.PORT || 3000,
  },
  IS_DEV: envValues.NODE_ENV != 'production',
  BCRYPT_COST: 10,
}
