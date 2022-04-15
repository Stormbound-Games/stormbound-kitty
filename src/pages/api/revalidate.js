import applyRateLimit from '~/helpers/applyRateLimit'
import { CATEGORIES as GUIDE_CATEGORIES } from '~/constants/guides'

const getRevalidationPaths = body => {
  // The path may be passed explicitly, for instance with the `bin/revalidate`
  // script of the revalidate GitHub Workflow.
  if (body.path) {
    return [body.path]
  }

  // The data received from the Sanity API is defined in the webhook settings
  // to avoid passing unnecessary data. If a new value is needed, reconfigure
  // the webhook first.
  const { category, date, device, id, season, slug, user, users } = body

  switch (body._type) {
    case 'artwork':
      return ['/fan-art', `/members/${user.slug.current}`]
    case 'avatar':
      return ['/fan-kit/avatars']
    case 'book':
      return ['/fan-kit/books']
    case 'brawl':
      return [`/brawl/${slug.current}`]
    case 'card':
      return [`/card/official/${id.current}`, '/stats']
    case 'changelog':
      const timestamp = new Date(date).valueOf()
      return [
        `/card/official/${id.current}`,
        `/card/official/${id.current}/${timestamp}`,
      ]
    case 'contribution':
    case 'donation':
      return ['/about', '/contribute', `/members/${user.slug.current}`]
    case 'deck':
      return ['/decks', `/deck/${id}/detail`, `/members/${user.slug.current}`]
    case 'deckTags':
      return ['/decks', '/decks/bookmarks']
    case 'equalTierList':
      return ['/tier-list/equals']
    case 'guide':
      return [
        `/guides/${slug.current}`,
        `/guides/${GUIDE_CATEGORIES[category].slug}`,
        ...users.map(user => `/members/${user.slug.current}`),
      ]
    case 'news':
      return ['/']
    case 'page':
      return [`/${slug.current}`]
    case 'podcast':
      return [
        '/brewed-sages',
        ...users.map(user => `/members/${user.slug.current}`),
      ]
    case 'puzzle':
      return [
        '/puzzles',
        `/puzzles/${slug.current}`,
        `/members/${user.slug.current}`,
      ]
    case 'release':
      return [
        '/releases',
        `/releases/${slug.current}`,
        `/members/${user.slug.current}`,
      ]
    case 'story':
      return [
        `/stories/${category}`,
        `/stories/${slug.current}`,
        `/members/${user.slug.current}`,
      ]
    case 'siteSettings':
      return ['/lexicon']
    case 'SWCC':
      return [
        '/swcc',
        `/swcc/season/${season}`,
        `/members/${user.slug.current}`,
      ]
    case 'tournament':
      return [
        '/tournaments/hall-of-fame',
        ...users.map(user => `/members/${user.slug.current}`),
      ]
    case 'user':
      return ['/members', `/members/${slug.current}`]
    case 'wallpaper':
      return [`/fan-kit/wallpapers/${device.toLowerCase()}`]
    default:
      return []
  }
}

export default async function handler(request, response) {
  try {
    await applyRateLimit(request, response)
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

  const paths = getRevalidationPaths(request.body)

  if (paths.length === 0) {
    return response.status(400).json({ message: 'Bad request' })
  }

  try {
    await Promise.all(paths.map(path => response.unstable_revalidate(path)))
    return response.json({ revalidated: true })
  } catch (error) {
    console.error(error)
    return response.status(500).send('Error revalidating')
  }
}
