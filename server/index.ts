import * as Koa from 'koa'
import * as koaBody from 'koa-body'
import * as session from 'koa-session'
import * as mongoose from 'mongoose'
import * as passport from 'koa-passport'
import * as cors from '@koa/cors'
import * as serve from 'koa-static'
import * as mount from 'koa-mount'

import { errorMiddleware } from './middlewares/error-handler'
import { clearCacheJob, clearOldMoviesJob } from './utils/cron'
import logs from './utils/logger'
import router from './routes'
import config from './config'
import './services/auth'

const ORIGIN_WHITELIST = ['http://localhost:4242']

/*
 * Cron jobs
 */

clearCacheJob()
clearOldMoviesJob()

/*
 * API setup
 */

const app = new Koa()

const checkOriginMiddleware = ctx => {
  const requestOrigin = ctx.accept.headers.origin
  if (!ORIGIN_WHITELIST.includes(requestOrigin)) {
    return ctx.throw(`🙈 ${requestOrigin} is not a valid origin`)
  }
  return requestOrigin
}

// TODO Streams are not passed  to ... but are automatiacally  added with onerror. When the user disconnect a streamed response, overrid the default koa comportment for handling the error. In our case, a client disconnecting is not an error and will happens as soon as he closes his browser.
const oldOnError = app.context.onerror
app.context.onerror = async (error: any) => {
  if (error && (error.errno === 'EPIPE' || error.errno === 'ECONNRESET')) return
  else await oldOnError(error)
}
app.use(cors({ credentials: true, origin: checkOriginMiddleware }))
app.use(errorMiddleware)
app.use(koaBody())

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
app.use(mount('/images', serve('./public/images')))

const mongoOptions = {
  useNewUrlParser: true,
  user: config.MONGO_USER,
  pass: config.MONGO_PWD,
  useUnifiedTopology: true,
}

mongoose
  .connect(config.MONGO_URL, mongoOptions)
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
