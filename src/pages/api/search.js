import Fuse from 'fuse.js'
import getSearchIndex from '~/helpers/getSearchIndex'
import applyRateLimit from '~/helpers/applyRateLimit'

export default async function handler(request, response) {
  const registry = await getSearchIndex(true)
  const index = new Fuse(registry, {
    keys: ['label'],
    minMatchCharLength: 3,
    isCaseSensitive: false,
  })

  try {
    await applyRateLimit(request, response)
  } catch {
    return response.status(429).json({ message: 'Too many requests' })
  }

  return response.status(200).json(
    index
      .search(request.query.s)
      .slice(0, 5)
      .map(entry => entry.item)
  )
}
