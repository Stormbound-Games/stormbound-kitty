import { getEntries } from '~/helpers/sanity'
import cleanSwcc from '~/api/swcc/clean'
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

const cleaners = {
  artwork: ARTWORK_MAPPER,
  channel: channel => channel,
  contribution: CONTRIBUTION_MAPPER,
  deck: DECK_MAPPER,
  donation: DONATION_MAPPER,
  event: EVENT_MAPPER,
  guide: GUIDE_MAPPER,
  podcast: PODCAST_MAPPER,
  puzzle: PUZZLE_MAPPER,
  story: STORY_MAPPER,
  swcc: cleanSwcc,
  tournament: TOURNAMENT_MAPPER,
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
      _type == "tournament" => { ${TOURNAMENT_FIELDS} },
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
