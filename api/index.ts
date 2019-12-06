import * as Koa from 'koa'
import * as koaBody from 'koa-body'
import * as session from 'koa-session'
import * as mongoose from 'mongoose'
import * as passport from 'koa-passport'
import * as cors from '@koa/cors'
import * as serve from 'koa-static'
import * as mount from 'koa-mount'

import { errorMiddleware, handleStreamDisconnect } from './middlewares/error-handler'
import { checkOriginMiddleware } from './middlewares/check-origin'
import { clearCacheJob, clearOldMoviesJob } from './utils/cron'
import logs from './utils/logger'
import router from './routes'
import config from './config'
import './services/auth'

/*
 * Cron jobs
 */

clearCacheJob()
clearOldMoviesJob()

/*
 * API setup
 */

const app = new Koa()

handleStreamDisconnect(app)
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
app.use(mount('/subtitles', serve('./public/subtitles')))
app.use(mount('/images', serve('./public/images')))

/*
 * Starting the API
 * - First we connect to the database
 * - Second the app listen on PORT
 */

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
