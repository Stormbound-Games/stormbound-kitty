import { getEntries } from '~/helpers/sanity'
import getUser from '~/api/users/getUser'
import groupBy from '~/helpers/groupBy'
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
import { FIELDS as SWCC_FIELDS, MAPPER as SWCC_MAPPER } from '~/api/swcc/utils'
import { FIELDS as CHANNEL_FIELDS } from '~/api/channels/utils'

const cleaners = {
  artwork: ARTWORK_MAPPER,
  channel: channel => channel,
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
      _type == "channel" => { ${CHANNEL_FIELDS} },
      _type == "contribution" => { ${CONTRIBUTION_FIELDS} },
      _type == "deck" => { ${DECK_FIELDS} },
      _type == "donation" => { ${DONATION_FIELDS} },
      _type == "event" => { ${EVENT_FIELDS} },
      _type == "guide" => { ${GUIDE_FIELDS} },
      _type == "podcast" => { ${PODCAST_FIELDS} },
      _type == "puzzle" => { ${PUZZLE_FIELDS} },
      _type == "story" => { ${STORY_FIELDS} },
      _type == "swcc" => { weeks[winner.author match $author] { ${SWCC_FIELDS} } },
      _type == "tournament" => {
        ${TOURNAMENT_FIELDS},
        count(hosts[@ match $author]) > 0 => { "_type": "tournament", },
        count(podium[].players[@ match $author]) > 0 => { "_type": "podium" }
      },
    `,
    params: { author, id: user._id },
    options: { order: 'date desc', isPreview },
  })

  const contributions = entries.length
  const content = groupBy(entries, '_type')

  for (let type in cleaners) {
    if (type in content) {
      // Clean every entry based on its type.
      content[type].forEach(entry => {
        cleaners[type](entry)
        // Delete the `_type` key now that it’s no longer needed.
        delete entry._type
      })
    } else {
      content[type] = []
    }
  }

  // Restore the potential YouTube channel as an object.
  content.channel = content.channel[0] || null

  if (content.swcc) {
    content.swcc = content.swcc.map(season => season.weeks).flat()
  }

  return {
    contributions,
    name: user.name,
    slug: user.slug,
    role: user.role,
    content,
    channel: content.channel,
  }
}

export default getContentFromUser
