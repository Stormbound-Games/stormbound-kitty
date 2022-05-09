import { GUIDE_CATEGORIES } from '~/constants/guides'
import { getRateLimitMiddlewares } from '~/helpers/applyRateLimit'
import uniqueBy from '~/helpers/uniqueBy'

// The data received from the Sanity API is defined in the webhook settings to
// avoid passing unnecessary data. If a new value is needed, reconfigure the
// webhook first.
const getRevalidationPaths = body => {
  // The path may be passed explicitly, for instance with the `bin/revalidate`
  // script of the revalidate GitHub Workflow.
  if (body.path) {
    return [body.path]
  }

  // The `users` field is a composed array (derived from several fields)
  // containing the author(s) *before* the change as well as the author(s)
  // *after* the change. This array needs to be cleaned of `null` and duplicate
  // values.
  const users = uniqueBy(body.users.filter(Boolean), 'slug')
  const userPaths = [
    users.length > 0 ? '/members' : null,
    ...users.map(user => `/members/${user.slug}`),
  ]

  switch (body._type) {
    case 'artwork':
      return [...userPaths, '/fan-art']
    case 'avatar':
      return ['/fan-kit/avatars']
    case 'book':
      return ['/fan-kit/books']
    case 'brawl': {
      const slug = body.slug?.current ?? body.slug
      return [slug && `/brawl/${slug}`]
    }
    case 'card': {
      const id = body.id?.current ?? body.id
      return [id && `/cards/${id}`, '/stats']
    }
    case 'changelog': {
      const id = body.id?.current ?? body.id
      const timestamp = new Date(body.date).valueOf()
      return [
        '/changelog',
        id && `/cards/${id}`,
        id && timestamp && `/cards/${id}/${timestamp}`,
      ]
    }
    case 'contribution':
    case 'donation':
      return [...userPaths, '/about', '/contribute']
    case 'deck':
      return [...userPaths, '/decks', body.id && `/deck/${body.id}/detail`]
    case 'deckTags':
      return ['/decks', '/decks/bookmarks']
    case 'equalTierList':
      return ['/tier-list/equals']
    case 'guide': {
      const slug = body.slug?.current ?? body.slug
      const category = GUIDE_CATEGORIES[body.category]
      return [
        ...userPaths,
        slug && `/guides/${slug}`,
        category && `/guides/${category.slug}`,
      ]
    }
    case 'news':
      return ['/']
    case 'page': {
      const slug = body.slug?.current ?? body.slug
      return [slug && `/${slug}`]
    }
    case 'podcast':
      return [...userPaths, '/brewed-sages']
    case 'puzzle': {
      const slug = body.slug?.current ?? body.slug
      return [...userPaths, '/puzzles', slug && `/puzzles/${slug}`]
    }
    case 'release': {
      const slug = body.slug?.current ?? body.slug
      return [...userPaths, '/releases', slug && `/releases/${slug}`]
    }
    case 'story': {
      const slug = body.slug?.current ?? body.slug
      return [
        ...userPaths,
        body.category && `/stories/${body.category}`,
        slug && `/stories/${slug}`,
      ]
    }
    case 'siteSettings':
      return ['/lexicon']
    case 'SWCC': {
      const { season, week } = body
      return [
        ...userPaths,
        '/swcc',
        season && `/swcc/season/${season}`,
        season && week && `/swcc/season/${season}/week/${week}`,
      ]
    }
    case 'tournament':
      return [...userPaths, '/tournaments/hall-of-fame']
    case 'user':
      return [...userPaths]
    case 'wallpaper':
      return [body.device && `/fan-kit/wallpapers/${body.device.toLowerCase()}`]
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
    const paths = getRevalidationPaths(request.body).filter(Boolean)

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
