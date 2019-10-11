import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as session from 'koa-session'
import * as mongoose from 'mongoose'
import * as passport from 'koa-passport'

import { errorMiddleware } from './middlewares/error-handler'
import logs from './utils/logger'
import router from './routes'
import config from './config'
import './services/auth'
import { checkProfileCompleted } from './middlewares/auth'

const app = new Koa()

app.use(errorMiddleware)
app.use(bodyParser())
app.keys = [config.SESSION_SECRET]
app.use(session({}, app))
app.use(passport.initialize()) // Currently keeps the sessions only in the local process
app.use(passport.session())
// app.use(checkProfileCompleted) // Not for auth routes ? Maybe complete it when doing it
app.use(router.routes()).use(router.allowedMethods())

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
