import * as Joi from 'joi'
import * as dotenv from 'dotenv'
import logs from '../utils/logger'

dotenv.config()

const envValidator = Joi.object()
  .keys({
    NODE_ENV: Joi.string().allow(['development', 'production']),
    API_PORT: Joi.number(),
    MONGO_URL: Joi.string(),
    MONGO_USER: Joi.string(),
    MONGO_PWD: Joi.string(),
  })
  .unknown()

const { error, value: envValues } = Joi.validate(process.env, envValidator)

if (error) {
  logs.error(`Environment variable error: ${error.message}`)
  process.exit(1)
}

export default {
  SERVER: {
    PORT: envValues.API_PORT || 3000,
  },
  MONGO: {
    URL: envValues.MONGO_URL || 'mongodb://localhost/hypertube',
    USER: envValues.MONGO_USER || "hypertube_api",
    PWD: envValues.MONGO_PWD || "dev_password",
  },
  IS_DEV: envValues.NODE_ENV != 'production',
  BCRYPT_COST: 10,
}
