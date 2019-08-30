import * as Joi from 'joi'
import logs from '../utils/logger'
import * as dotenv from 'dotenv'

dotenv.config()

const envFormat = Joi.object()
  .keys({
    PORT: Joi.number().required(),
  })
  .unknown()

const { error, value: envValues } = Joi.validate(process.env, envFormat)

if (error) {
  logs.error('Environment variable error')
  throw error
}

export default {
  SERVER: {
    PORT: envValues.PORT,
  },
}
