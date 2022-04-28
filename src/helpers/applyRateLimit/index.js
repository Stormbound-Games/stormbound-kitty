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

const withSlowDown = applyMiddleware(
  slowDown({
    ...MIDDLEWARE_CONFIG,
    delayAfter: Math.round(LIMIT_PER_WINDOW / 2),
    delayMs: 500,
  })
)
const withRateLimit = applyMiddleware(
  rateLimit({ ...MIDDLEWARE_CONFIG, max: LIMIT_PER_WINDOW })
)

async function applyRateLimit(request, response) {
  await withSlowDown(request, response)
  await withRateLimit(request, response)
}

export default applyRateLimit
