import * as koaBody from 'koa-body'

export const cacheFileMiddleware = koaBody({ multipart: true, formidable: { uploadDir: __dirname + '/../cache' } })
