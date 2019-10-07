import * as Joi from '@hapi/joi'
import * as dotenv from 'dotenv'
import logs from '../utils/logger'

dotenv.config()

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().allow('development', 'production'),
    SERVER_PORT: Joi.number(),
    MONGO_URL: Joi.string(),
    MONGO_USER: Joi.string(),
    MONGO_PWD: Joi.string(),
    JWT_SECRET: Joi.string(),
    SESSION_SECRET: Joi.string(),
    API_THE_MOVIE_DB_KEY: Joi.string().required(),
    GOOGLE_CONSUMER_KEY: Joi.string().required(),
    GOOGLE_CONSUMER_SECRET: Joi.string().required(),
    FACEBOOK_APP_ID: Joi.string().required(),
    FACEBOOK_APP_SECRET: Joi.string().required(),
  })
  .unknown()

const { error, value: envValues } = envSchema.validate(process.env)

if (error) {
  logs.error(`Environment variable error: ${error.message}`)
  process.exit(1)
}

export default {
  SERVER: {
    PORT: envValues.SERVER_PORT || 3000,
  },
  MONGO: {
    URL: envValues.MONGO_URL || 'mongodb://localhost/hypertube',
    USER: envValues.MONGO_USER || 'hypertube_api',
    PWD: envValues.MONGO_PWD || 'dev_password',
  },
  IS_DEV: envValues.NODE_ENV != 'production',
  BCRYPT_COST: 10,
  JWT_SECRET: envValues.JWT_SECRET || 'dev_secret',
  JWT_EXP_DELAY: 60 * 60 * 24 * 31,
  SESSION_SECRET: envValues.SESSION_SECRET || 'not_secure_secret',
  APIS: {
    THE_MOVIE_DB_KEY: envValues.API_THE_MOVIE_DB_KEY,
    GOOGLE_CONSUMER_KEY: envValues.GOOGLE_CONSUMER_KEY,
    GOOGLE_CONSUMER_SECRET: envValues.GOOGLE_CONSUMER_SECRET,
    FACEBOOK_APP_ID: envValues.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: envValues.FACEBOOK_APP_SECRET,
  },
}
