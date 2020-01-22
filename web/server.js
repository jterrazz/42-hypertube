const express = require('express')
const next = require('next')
const request = require('request')
const nextI18NextMiddleware = require('next-i18next/middleware').default

const nextI18next = require('./utils/i18n')

const port = process.env.PORT || 4242
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();

(async () => {
  await app.prepare()
  const server = express()

  server.use('/public', express.static('public'))
  server.use(nextI18NextMiddleware(nextI18next))

  server.get('/subtitles/:file', async (req, res) => {
    request(process.env.INTERNAL_CLIENT_API + req.originalUrl)
      .on('error', function(err) {
        res.end()
      })
      .pipe(res);
  })

  server.get('*', (req, res) => handle(req, res))

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
})()
