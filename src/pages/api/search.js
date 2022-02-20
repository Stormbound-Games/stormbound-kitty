import Fuse from 'fuse.js'
import getSearchIndex from '~/helpers/getSearchIndex'
import applyMiddleware from '~/helpers/applyMiddleware'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'

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

export default async function handler(request, response) {
  const registry = await getSearchIndex(true)
  const index = new Fuse(registry, {
    keys: ['label'],
    minMatchCharLength: 3,
    isCaseSensitive: false,
  })

  await applyRateLimit(request, response)

  return response.status(200).json(
    index
      .search(request.query.s)
      .slice(0, 5)
      .map(entry => entry.item)
  )
}
