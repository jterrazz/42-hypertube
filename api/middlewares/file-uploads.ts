import * as koaBody from 'koa-body'

const MAX_FILE_SIZE = 1024 * 1024 * 10

const formidableOptions = {
  uploadDir: __dirname + '/../cache',
  maxFileSize: MAX_FILE_SIZE,
}

export const cacheFileMiddleware = koaBody({ multipart: true, formidable: formidableOptions })
