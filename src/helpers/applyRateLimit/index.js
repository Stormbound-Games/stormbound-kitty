import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import applyMiddleware from '~/helpers/applyMiddleware'
import getIP from '~/helpers/getIP'

export const LIMIT_PER_WINDOW = 20
const MIDDLEWARE_CONFIG = {
  legacyHeaders: true,
  windowMs: 60 * 1000,
  keyGenerator: getIP,
}

export const getRateLimitMiddlewares = (limit, windowMs = 60 * 1000) => {
  const config = { ...MIDDLEWARE_CONFIG, windowMs }

  return [
    slowDown({ ...config, delayAfter: Math.round(limit / 2), delayMs: 500 }),
    rateLimit({ ...config, max: limit }),
  ].map(applyMiddleware)
}

const middlewares = getRateLimitMiddlewares(LIMIT_PER_WINDOW)

async function applyRateLimit(request, response) {
  await Promise.all(
    middlewares.map(middleware => middleware(request, response))
  )
}

export default applyRateLimit
