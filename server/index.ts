import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as session from 'koa-session'
import * as mongoose from 'mongoose'
import * as passport from 'koa-passport'
import * as cors from '@koa/cors'
import * as serve from 'koa-static'
import * as mount from 'koa-mount'

import { errorMiddleware } from './middlewares/error-handler'
import logs from './utils/logger'
import router from './routes'
import config from './config'
import './services/auth'

const ORIGIN_WHITELIST = ['http://localhost:4242']

const app = new Koa()

const checkOriginMiddleware = ctx => {
  const requestOrigin = ctx.accept.headers.origin
  if (!ORIGIN_WHITELIST.includes(requestOrigin)) {
    return ctx.throw(`🙈 ${requestOrigin} is not a valid origin`)
  }
  return requestOrigin
}

app.use(cors({ credentials: true, origin: checkOriginMiddleware }))
app.use(errorMiddleware)
app.use(bodyParser())

/*
 * Authentication: An in memory session in created for each authenticated client.
 * The user data is saved locally, and a secure token matching this token is sent to the client using cookies.
 * To use multiple threads, the session instance could easily be configured using redis.
 */

app.keys = [config.SESSION_SECRET]
app.use(session({}, app))
app.use(passport.initialize())
app.use(passport.session())
app.use(router.routes()).use(router.allowedMethods())
app.use(mount('/subtitles', serve('./public/subtitles')))

mongoose
  .connect(config.MONGO_URL, { useNewUrlParser: true, user: config.MONGO_USER, pass: config.MONGO_PWD })
  .then(() => {
    app
      .listen(config.SERVER_PORT, () => {
        logs.info(`Server listening on port ${config.SERVER_PORT} 😊`)
      })
      .on('error', err => {
        logs.error(err.message)
        process.exit(1)
      })
  })
  .catch(err => {
    logs.error(err.message)
    process.exit(1)
  })
