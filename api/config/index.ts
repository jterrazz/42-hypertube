import * as Joi from '@hapi/joi'
import * as dotenv from 'dotenv'
import logs from '../utils/logger'

dotenv.config()

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('development', 'production')
      .default('development'),
    SERVER_PORT: Joi.number().default(3000),
    CLIENT_URL: Joi.string().default('http://localhost:4242'),
    API_URL: Joi.string().default('http://localhost:3000'),
    API_VERSION: Joi.string().default('1.0'),

    // MongoDB
    MONGO_URL: Joi.string().default('mongodb://localhost/hypertube'),
    MONGO_USER: Joi.string().default('hypertube_api'),
    MONGO_PWD: Joi.string().default('dev_password'),

    // Security
    JWT_SECRET: Joi.string().default('test_only_secret'),
    SESSION_SECRET: Joi.string().default('test_only_secret'),
    BCRYPT_COST: Joi.number().default(10),
    CAPTCHA_KEY: Joi.string().required(),

    // External services
    API_NODE_MAILER_KEY: Joi.string().required(),
    API_NODE_MAILER_DOMAIN: Joi.string().default('sandbox01ad73b07ab849a38fc81edc7337e55b.mailgun.org'),
    API_YTS_KEY: Joi.string().required(),
    API_THE_MOVIE_DB_KEY: Joi.string().required(),
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

export default envValues
