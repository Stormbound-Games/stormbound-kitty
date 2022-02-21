import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import applyMiddleware from '~/helpers/applyMiddleware'

const getIP = request =>
  request.ip || request.headers['x-real-ip'] || request.connection.remoteAddress

async function applyRateLimit(request, response) {
  const limitPerWindow = 20
  const config = {
    legacyHeaders: true,
    windowMs: 60 * 1000,
    keyGenerator: getIP,
  }

  await applyMiddleware(
    request,
    response,
    slowDown({ ...config, delayAfter: limitPerWindow, delayMs: 500 })
  )

  await applyMiddleware(
    request,
    response,
    rateLimit({ ...config, max: limitPerWindow })
  )
}

export default applyRateLimit
