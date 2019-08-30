import * as Koa from 'koa'
import { router } from './routes'
import config from './config'
import logs from './utils/logger'

const app = new Koa()

app.use(router.routes()).use(router.allowedMethods())

app.listen(config.SERVER.PORT, () => {
  logs.info(`Server listening on port ${config.SERVER.PORT} 😊`)
})
