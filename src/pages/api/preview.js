import applyRateLimit from '~/helpers/applyRateLimit'
import getDeck from '~/api/decks/getDeck'
import getGuide from '~/api/guides/getGuide'
import getPuzzle from '~/api/puzzles/getPuzzle'
import getStory from '~/api/stories/getStory'

const PREVIEW_MODE_DURATION = 60 * 60

const getRedirectUrl = async params => {
  switch (params.type) {
    case 'artwork':
      return '/fan-art'

    case 'channel':
      return '/videos'

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

    case 'puzzle': {
      const puzzle = await getPuzzle(params)

      return puzzle ? `/simulators/battle/${puzzle.id}` : null
    }

    case 'story': {
      const story = await getStory(params)

      return story ? `/stories/${story.slug}` : null
    }

    case 'deck': {
      const deck = await getDeck(params)

      return deck ? `/deck/${deck.id}/detail` : null
    }

    case 'guide': {
      const guide = await getGuide(params)

      return guide ? `/guides/${guide.slug}` : null
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
