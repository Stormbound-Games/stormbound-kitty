import { getEntries } from '~/helpers/sanity'
import getUser from '~/api/users/getUser'
import {
  FIELDS as ARTWORK_FIELDS,
  MAPPER as ARTWORK_MAPPER,
} from '~/api/artworks/utils'
import {
  FIELDS as PODCAST_FIELDS,
  MAPPER as PODCAST_MAPPER,
} from '~/api/podcasts/utils'
import {
  FIELDS as PUZZLE_FIELDS,
  MAPPER as PUZZLE_MAPPER,
} from '~/api/puzzles/utils'
import {
  FIELDS as STORY_FIELDS,
  MAPPER as STORY_MAPPER,
} from '~/api/stories/utils'
import {
  FIELDS as CONTRIBUTION_FIELDS,
  MAPPER as CONTRIBUTION_MAPPER,
} from '~/api/contributions/utils'
import {
  FIELDS as DONATION_FIELDS,
  MAPPER as DONATION_MAPPER,
} from '~/api/donations/utils'
import { FIELDS as DECK_FIELDS, MAPPER as DECK_MAPPER } from '~/api/decks/utils'
import {
  FIELDS as EVENT_FIELDS,
  MAPPER as EVENT_MAPPER,
} from '~/api/events/utils'
import {
  FIELDS as GUIDE_FIELDS,
  MAPPER as GUIDE_MAPPER,
} from '~/api/guides/utils'
import {
  FIELDS as TOURNAMENT_FIELDS,
  MAPPER as TOURNAMENT_MAPPER,
} from '~/api/tournaments/utils'
import {
  FIELDS as SWCC_FIELDS,
  FEED_MAPPER as SWCC_MAPPER,
} from '~/api/swcc/utils'

const cleaners = {
  artwork: ARTWORK_MAPPER,
  contribution: CONTRIBUTION_MAPPER,
  deck: DECK_MAPPER,
  donation: DONATION_MAPPER,
  event: EVENT_MAPPER,
  guide: GUIDE_MAPPER,
  podcast: PODCAST_MAPPER,
  podium: TOURNAMENT_MAPPER,
  puzzle: PUZZLE_MAPPER,
  story: STORY_MAPPER,
  swcc: SWCC_MAPPER,
  tournament: TOURNAMENT_MAPPER,
}

const getContentFromUser = async ({ author, isPreview } = {}) => {
  const user = await getUser({ slug: author, isPreview })

  if (!user) return {}

  const entries = await getEntries({
    conditions: ['references($id)'],
    fields: `
      _id,
      _type,
      _type == "artwork" => { ${ARTWORK_FIELDS} },
      _type == "contribution" => { ${CONTRIBUTION_FIELDS} },
      _type == "deck" => { ${DECK_FIELDS} },
      _type == "donation" => { ${DONATION_FIELDS} },
      _type == "event" => { ${EVENT_FIELDS} },
      _type == "guide" => { ${GUIDE_FIELDS} },
      _type == "podcast" => { ${PODCAST_FIELDS} },
      _type == "puzzle" => { ${PUZZLE_FIELDS} },
      _type == "story" => { ${STORY_FIELDS} },
      _type == "swcc" => { weeks[winner.user->slug.current match $author] { ${SWCC_FIELDS} } },
      _type == "tournament" => {
        ${TOURNAMENT_FIELDS},
        count(users[@->slug.current match $author]) > 0 => { "_type": "tournament", },
        count(podium[].team[@->slug.current match $author]) > 0 => { "_type": "podium" }
      },
    `,
    params: { author, id: user._id.replace('drafts.', '') },
    options: { order: 'date desc', isPreview },
  })

  const hasDonated = entries.some(entry => entry._type === 'donation')
  const hasContributed = entries.some(entry => entry._type === 'contribution')
  // We flatten in case an entry is being split into several feed items, like
  // for SWCC entries.
  const feed = entries.map(entry => cleaners[entry._type](entry)).flat()

  return {
    user,
    feed,
    hasDonated,
    hasContributed,
  }
}

export default getContentFromUser
