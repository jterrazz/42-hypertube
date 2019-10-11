import * as Joi from '@hapi/joi'
import * as dotenv from 'dotenv'

import logs from '../utils/logger'

dotenv.config()

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .allow('development', 'production')
      .default('development'),
    SERVER_PORT: Joi.number().default(3000),

    // MongoDB
    MONGO_URL: Joi.string().default('mongodb://localhost/hypertube'),
    MONGO_USER: Joi.string().default('hypertube_api'),
    MONGO_PWD: Joi.string().default('dev_password'),

    // Security
    JWT_SECRET: Joi.string().default('test_only_secret'),
    JWT_EXP_DELAY: Joi.number().default(60 * 60 * 24 * 31),
    SESSION_SECRET: Joi.string().default('test_only_secret'),
    BCRYPT_COST: Joi.number().default(10),

    // External services
    API_YTS_KEY: Joi.string().required(),
    API_GOOGLE_CONSUMER_KEY: Joi.string().required(),
    API_GOOGLE_CONSUMER_SECRET: Joi.string().required(),
    API_FACEBOOK_APP_ID: Joi.string().required(),
    API_FACEBOOK_APP_SECRET: Joi.string().required(),
    API_FORTYTWO_APP_ID: Joi.string().required(),
    API_FORTYTWO_APP_SECRET: Joi.string().required(),
    API_GITHUB_CLIENT_ID: Joi.string().required(),
    API_GITHUB_CLIENT_SECRET: Joi.string().required(),
  })
  .unknown()

const { error, value: envValues } = envSchema.validate(process.env)

if (error) {
  logs.error(`Environment variable error: ${error.message}`)
  process.exit(1)
}

// envValues.IS_DEV = envValues.NODE_ENV != 'production'
export default envValues
