import LRUCache from 'lru-cache'
import Fuse from 'fuse.js'
import getSearchIndex from '~/helpers/getSearchIndex'
import applyRateLimit from '~/helpers/applyRateLimit'

const cache = new LRUCache({
  // Single item cache (full registry).
  max: 1,
  // 12 hours long cache.
  ttl: 1000 * 60 * 60 * 12,
})

const getRegistry = async (isPreview = false) => {
  if (cache.has('registry')) return cache.get('registry')
  const registry = await getSearchIndex({ isPreview })
  cache.set('registry', registry)
  return registry
}

export default async function handler(request, response) {
  const registry = await getRegistry(request.preview)
  const index = new Fuse(registry, {
    keys: [
      { name: 'label', weight: 0.7 },
      { name: 'breadcrumbs', weight: 0.3 },
    ],
    minMatchCharLength: 3,
    isCaseSensitive: false,
    includeScore: true,
  })

  try {
    await applyRateLimit(request, response)
  } catch {
    return response.status(429).json({ message: 'Too many requests' })
  }

  // Set up a 4 hours cache on the response.
  response.setHeader('Cache-Control', 's-maxage=' + 60 * 60 * 4 + ', public')

  const term = (request.query.search || '').trim()

  if (term.length === 0) {
    return response.status(400).send('Bad request')
  }

  return response.status(200).json(index.search(term).slice(0, 6))
}
