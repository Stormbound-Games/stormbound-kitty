import applyRateLimit from '~/helpers/applyRateLimit'
import getBrawl from '~/api/brawls/getBrawl'
import getCard from '~/api/cards/getCard'
import getDeck from '~/api/decks/getDeck'
import getGuide from '~/api/guides/getGuide'
import getPage from '~/api/pages/getPage'
import getPuzzle from '~/api/puzzles/getPuzzle'
import getRelease from '~/api/releases/getRelease'
import getStory from '~/api/stories/getStory'
import getSWCCFromCard from '~/api/swcc/getSWCCFromCard'
import getUser from '~/api/users/getUser'

const PREVIEW_MODE_DURATION = 60 * 60

const getRedirectUrl = async params => {
  switch (params.type) {
    case 'artwork':
      return '/fan-art'

    case 'avatar':
      return '/fan-kit/avatars'

    case 'book':
      return '/fan-kit/books'

    case 'brawl': {
      const brawl = await getBrawl(params)

      return brawl ? `/brawl/${brawl.slug}` : null
    }

    case 'card':
    case 'changelog': {
      const card = await getCard(params)

      return card ? `/cards/${card.id}` : null
    }

    case 'contribution':
    case 'donation':
      return '/contribute'

    case 'deck': {
      const deck = await getDeck(params)

      return deck ? `/deck/${deck.id}/detail` : null
    }

    case 'deckTags':
      return '/decks'

    case 'equalTierList':
      return '/tier-list/equals'

    case 'event':
      return '/'

    case 'guide': {
      const guide = await getGuide(params)

      return guide ? `/guides/${guide.slug}` : null
    }

    case 'news':
      return '/'

    case 'podcast':
      return '/brewed-sages'

    case 'page': {
      const page = await getPage(params)

      return page ? `/${page.slug}` : null
    }

    case 'puzzle': {
      const puzzle = await getPuzzle(params)

      return puzzle ? `/puzzles/${puzzle.slug}` : null
    }

    case 'release': {
      const release = await getRelease(params)

      return release ? `/releases/${release.slug}` : null
    }

    case 'siteSettings':
      return '/'

    case 'story': {
      const story = await getStory(params)

      return story ? `/stories/${story.slug}` : null
    }

    case 'SWCC': {
      const contest = await getSWCCFromCard(params)

      return contest
        ? `/swcc/season/${contest.season}/week/${contest.week}`
        : null
    }

    case 'tournament':
      return '/tournaments/hall-of-fame'

    case 'user': {
      const user = await getUser(params)

      return user ? `/members/${user.slug}` : null
    }

    case 'wallpaper':
      return '/fan-kit/wallpapers'

    default:
      return null
  }
}

export default async function handler(request, response) {
  const { token, ...parameters } = request.query

  try {
    await applyRateLimit(request, response)
  } catch {
    return response.status(429).send('Too many requests')
  }

  if (parameters.type === 'clear') {
    response.clearPreviewData()

    return response.redirect(request.headers.referer || '/')
  }

  if (token !== process.env.SANITY_STUDIO_PREVIEW_TOKEN) {
    return response.status(401).send('Unauthorized')
  }

  try {
    // For the preview mode to be able to find entries that have not been ever
    // published yet, it needs to force the preview option when querying data from
    // Sanity.
    const url = await getRedirectUrl({ ...parameters, isPreview: true })

    response.setPreviewData({}, { maxAge: PREVIEW_MODE_DURATION })
    response.redirect(url)
  } catch (error) {
    console.error(error)

    return response.status(400).send('Bad request')
  }
}
