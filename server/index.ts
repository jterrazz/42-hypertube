import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as mongoose from 'mongoose'

import { router } from './routes'
import config from './config'
import logs from './utils/logger'
import { errorMiddleware } from './middlewares/error-handler'

const app = new Koa()

app.use(errorMiddleware)
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

mongoose
  .connect(config.MONGO.URL, { useNewUrlParser: true, user: config.MONGO.USER, pass: config.MONGO.PWD })
  .then(() => {
    app
      .listen(config.SERVER.PORT, () => {
        logs.info(`Server listening on port ${config.SERVER.PORT} 😊`)
      })
      .on('error', err => {
        // TODO Hide if subject is stupid
        logs.error(err.message)
        process.exit(1)
      })
  })
  .catch(err => {
    // TODO Hide if subject is stupid
    logs.error(err.message)
    process.exit(1)
  })
