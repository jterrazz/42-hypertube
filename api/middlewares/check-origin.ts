const ORIGIN_WHITELIST = ['http://localhost:4242']

export const checkOriginMiddleware = ctx => {
  const requestOrigin = ctx.accept.headers.origin
  if (!ORIGIN_WHITELIST.includes(requestOrigin)) {
    return ctx.throw(`🙈 ${requestOrigin} is not a valid origin`)
  }
  return requestOrigin
}
