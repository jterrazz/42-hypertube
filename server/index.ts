import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'

import { router } from './routes'
import config from './config'
import logs from './utils/logger'

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.isJoi) {
      ctx.status = err.status || 400
      ctx.body = err.message
    } else {
      ctx.app.emit('error', err, ctx)
    }
  }
})

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app
  .listen(config.SERVER.PORT, () => {
    logs.info(`Server listening on port ${config.SERVER.PORT} 😊`)
  })
  .on('error', err => {
    logs.error(err.message)
    process.exit(1)
  })
