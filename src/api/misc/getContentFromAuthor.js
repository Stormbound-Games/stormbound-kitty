import { getEntries } from '~/helpers/sanity'
import cleanChannel from '~/api/channels/clean'
import cleanContribution from '~/api/contributions/clean'
import cleanDeck from '~/api/decks/clean'
import cleanDonation from '~/api/donations/clean'
import cleanEvent from '~/api/events/clean'
import cleanGuide from '~/api/guides/clean'
import cleanPodcast from '~/api/podcasts/clean'
import cleanPuzzle from '~/api/puzzles/clean'
import cleanStory from '~/api/stories/clean'
import cleanSwcc from '~/api/swcc/clean'
import cleanTournament from '~/api/tournaments/clean'
import getSWCCFromAuthor from '~/api/swcc/getSWCCFromAuthor'
import getTournamentsWithAuthor from '~/api/tournaments/getTournamentsWithAuthor'
import groupBy from '~/helpers/groupBy'
import {
  FIELDS as ARTWORK_FIELDS,
  MAPPER as ARTWORK_MAPPER,
} from '~/api/artworks/utils'

const cleaners = {
  artwork: ARTWORK_MAPPER,
  channel: cleanChannel,
  contribution: cleanContribution,
  deck: cleanDeck,
  donation: cleanDonation,
  event: cleanEvent,
  guide: cleanGuide,
  podcast: cleanPodcast,
  puzzle: cleanPuzzle,
  story: cleanStory,
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
      _type != "artwork" => { ... },
      _type == "artwork" => { _type, ${ARTWORK_FIELDS} },
      _type == "story" => { cardRef -> { id } },
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
