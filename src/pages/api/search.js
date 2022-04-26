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

  return response
    .status(200)
    .json(index.search(request.query.search.trim()).slice(0, 6))
}
