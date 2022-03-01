import { getEntries } from '~/helpers/sanity'
import cleanEvent from '~/api/events/clean'
import cleanGuide from '~/api/guides/clean'
import cleanSwcc from '~/api/swcc/clean'
import cleanTournament from '~/api/tournaments/clean'
import getSWCCFromAuthor from '~/api/swcc/getSWCCFromAuthor'
import getTournamentsWithAuthor from '~/api/tournaments/getTournamentsWithAuthor'
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

const cleaners = {
  artwork: ARTWORK_MAPPER,
  channel: channel => channel,
  contribution: CONTRIBUTION_MAPPER,
  deck: DECK_MAPPER,
  donation: DONATION_MAPPER,
  event: cleanEvent,
  guide: cleanGuide,
  podcast: PODCAST_MAPPER,
  puzzle: PUZZLE_MAPPER,
  story: STORY_MAPPER,
  swcc: cleanSwcc,
  tournament: cleanTournament,
}

const getContentFromAuthor = async ({ author, isPreview } = {}) => {
  const entries = await getEntries({
    conditions: [
      // Find *any* type of content that’s somewhat related to the author,
      // either by mentioning it directly, or in an array of authors, or in an
      // array of hosts. Tournament podiums and SWCC wins are handled separately
      // for convenience.
      [
        'author match $author',
        'count(authors[lower(@) == $author]) > 0',
        'count(hosts[lower(@) == $author]) > 0',
      ].join('||'),
    ],
    fields: `
      _type != "artwork" && _type != "podcast" && _type != "puzzle" && _type != "story" && _type != "contribution" && _type != "donation" && _type != "deck" => { ... },
      _type == "artwork" => { _type, ${ARTWORK_FIELDS} },
      _type == "podcast" => { _type, ${PODCAST_FIELDS} },
      _type == "puzzle" => { _type, ${PUZZLE_FIELDS} },
      _type == "story" => { _type, ${STORY_FIELDS} },
      _type == "contribution" => { _type, ${CONTRIBUTION_FIELDS} },
      _type == "donation" => { _type, ${DONATION_FIELDS} },
      _type == "deck" => { _type, ${DECK_FIELDS} },
      _type == "guide" => { card    -> { id } }
    `,
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  const content = groupBy(entries, '_type')

  for (let type in content) {
    // Clean every entry based on its type.
    content[type].forEach(cleaners[type])
  }

  // Handle the tournament podiums and SWCC wins.
  content.podium = await getTournamentsWithAuthor({ author, isPreview })
  content.swcc = await getSWCCFromAuthor({ author, isPreview })

  // Restore the potential YouTube channel as an object.
  if (content.channel) {
    content.channel = content.channel[0]
  }

  return content
}

export default getContentFromAuthor
