import applyRateLimit from '~/helpers/applyRateLimit'
import getBrawl from '~/api/brawls/getBrawl'
import getCard from '~/api/cards/getCard'
import getDeck from '~/api/decks/getDeck'
import getGuide from '~/api/guides/getGuide'
import getPuzzle from '~/api/puzzles/getPuzzle'
import getRelease from '~/api/releases/getRelease'
import getStory from '~/api/stories/getStory'
import getUser from '~/api/users/getUser'

const PREVIEW_MODE_DURATION = 60 * 60

const getRedirectUrl = async params => {
  switch (params.type) {
    case 'siteSettings':
      return '/'

    case 'equalTierList':
      return '/list/equals'

    case 'artwork':
      return '/fan-art'

    case 'donation':
      return '/about'

    case 'event':
      return '/'

    case 'podcast':
      return '/brewed-sages'

    case 'tournament':
      return '/tournaments/hall-of-fame'

    case 'avatars':
      return '/fan-kit/avatars'

    case 'wallpaper':
      return '/fan-kit/wallpapers'

    case 'card':
    case 'changelog': {
      const card = await getCard(params)

      return card ? `/card/${card.id}/display` : null
    }

    case 'puzzle': {
      const puzzle = await getPuzzle(params)

      return puzzle ? `/simulators/battle/${puzzle.id}` : null
    }

    case 'release': {
      const release = await getRelease(params)

      return release ? `/releases/${release.slug}` : null
    }

    case 'story': {
      const story = await getStory(params)

      return story ? `/stories/${story.slug}` : null
    }

    case 'deck': {
      const deck = await getDeck(params)

      return deck ? `/deck/${deck.id}/detail` : null
    }

    case 'brawl': {
      const brawl = await getBrawl(params)

      return brawl ? `/brawl/${brawl.slug}` : null
    }

    case 'guide': {
      const guide = await getGuide(params)

      return guide ? `/guides/${guide.slug}` : null
    }

    case 'user': {
      const user = await getUser(params)

      return user ? `/members/${user.slug}` : null
    }

    default:
      return null
  }
}

export default async function handler(request, response) {
  const { token, ...parameters } = request.query

  try {
    await applyRateLimit(request, response)
  } catch {
    return response.status(429).json({ message: 'Too many requests' })
  }

  if (parameters.type === 'clear') {
    response.clearPreviewData()

    return response.redirect(request.headers.referer || '/')
  }

  if (token !== process.env.SANITY_STUDIO_PREVIEW_TOKEN) {
    return response.status(401).json({ message: 'Invalid token' })
  }

  // For the preview mode to be able to find entries that have not been ever
  // published yet, it needs to force the preview option when querying data from
  // Sanity.
  const url = await getRedirectUrl({ ...parameters, isPreview: true })

  if (!url) {
    return response.status(401).json({ message: 'Invalid parameters' })
  }

  response.setPreviewData({}, { maxAge: PREVIEW_MODE_DURATION })
  response.redirect(url)
}
