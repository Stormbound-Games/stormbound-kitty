import { GUIDE_CATEGORIES } from '~/constants/guides'
import { getRateLimitMiddlewares } from '~/helpers/applyRateLimit'
import uniqueBy from '~/helpers/uniqueBy'

const getRevalidationPaths = body => {
  // The path may be passed explicitly, for instance with the `bin/revalidate`
  // script of the revalidate GitHub Workflow.
  if (body.path) {
    return [body.path]
  }

  // The data received from the Sanity API is defined in the webhook settings
  // to avoid passing unnecessary data. If a new value is needed, reconfigure
  // the webhook first.
  const { category, date, device, id, season, slug } = body

  // The `users` field is a composed array (derived from several fields)
  // containing the author(s) *before* the change as well as the author(s)
  // *after* the change. This array needs to be cleaned of `null` and duplicate
  // values.
  const users = uniqueBy(body.users.filter(Boolean), 'slug')
  const userPaths = [
    users.length > 0 ? '/members' : null,
    ...users.map(user => `/members/${user.slug}`),
  ].filter(Boolean)

  switch (body._type) {
    case 'artwork':
      return [...userPaths, '/fan-art']
    case 'avatar':
      return ['/fan-kit/avatars']
    case 'book':
      return ['/fan-kit/books']
    case 'brawl':
      return [`/brawl/${slug.current}`]
    case 'card':
      return [`/cards/${id.current}`, '/stats']
    case 'changelog':
      const timestamp = new Date(date).valueOf()
      return [
        '/changelog',
        `/cards/${id.current}`,
        `/cards/${id.current}/${timestamp}`,
      ]
    case 'contribution':
    case 'donation':
      return [...userPaths, '/about', '/contribute']
    case 'deck':
      return [...userPaths, '/decks', `/deck/${id}/detail`]
    case 'deckTags':
      return ['/decks', '/decks/bookmarks']
    case 'equalTierList':
      return ['/tier-list/equals']
    case 'guide':
      return [
        ...userPaths,
        `/guides/${slug.current}`,
        `/guides/${GUIDE_CATEGORIES[category].slug}`,
      ]
    case 'news':
      return ['/']
    case 'page':
      return [`/${slug.current}`]
    case 'podcast':
      return [...userPaths, '/brewed-sages']
    case 'puzzle':
      return [...userPaths, '/puzzles', `/puzzles/${slug.current}`]
    case 'release':
      return [...userPaths, '/releases', `/releases/${slug.current}`]
    case 'story':
      return [...userPaths, `/stories/${category}`, `/stories/${slug.current}`]
    case 'siteSettings':
      return ['/lexicon']
    case 'SWCC':
      return [...userPaths, '/swcc', `/swcc/season/${season}`]
    case 'tournament':
      return [...userPaths, '/tournaments/hall-of-fame']
    case 'user':
      return [...userPaths]
    case 'wallpaper':
      return [`/fan-kit/wallpapers/${device.toLowerCase()}`]
    default:
      return []
  }
}

// This endpoint benefits from a higher rate limit as publishing a lot of
// Sanity documents in a short amount of time is typically what happens when
// publishing release notes (new cards + balance changes + release publication).
const middlewares = getRateLimitMiddlewares(40)

export default async function handler(request, response) {
  try {
    await Promise.all(
      middlewares.map(middleware => middleware(request, response))
    )
  } catch {
    return response.status(429).json({ message: 'Too many requests' })
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' })
  }

  const Authorization = request.headers.authorization || ''
  const token = Authorization.replace(/bearer/i, '').trim()

  if (token !== process.env.NEXT_REVALIDATION_TOKEN) {
    return response.status(401).json({ message: 'Invalid token' })
  }

  try {
    const paths = getRevalidationPaths(request.body)

    if (paths.length === 0) {
      return response.status(400).json({ message: 'Bad request' })
    }

    await Promise.all(paths.map(path => response.unstable_revalidate(path)))
    return response.json({ revalidated: true })
  } catch (error) {
    console.error(error)
    return response.status(500).send('Error revalidating')
  }
}
