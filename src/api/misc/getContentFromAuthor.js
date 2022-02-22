import { getEntries } from '~/helpers/sanity'
import cleanArtwork from '~/api/artworks/clean'
import cleanChannel from '~/api/channels/clean'
import cleanContribution from '~/api/contributions/clean'
import cleanDeck from '~/api/decks/clean'
import cleanDonation from '~/api/donations/clean'
import cleanEvent from '~/api/events/clean'
import cleanPodcast from '~/api/podcasts/clean'
import cleanPuzzle from '~/api/puzzles/clean'
import cleanStory from '~/api/stories/clean'
import cleanSwcc from '~/api/swcc/clean'
import cleanTournament from '~/api/tournaments/clean'
import getSWCCFromAuthor from '~/api/swcc/getSWCCFromAuthor'
import getTournamentsWithAuthor from '~/api/tournaments/getTournamentsWithAuthor'

const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})

const cleaners = {
  artwork: cleanArtwork,
  channel: cleanChannel,
  contribution: cleanContribution,
  deck: cleanDeck,
  donation: cleanDonation,
  event: cleanEvent,
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
    fields: `..., defined(image) => { image { asset -> { ... } } }`,
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  const groupedEntries = groupBy(entries, '_type')

  for (let type in groupedEntries) {
    // Skip guides until they are handled via Sanity in the app.
    if (type === 'guide') continue
    // Clean every entry based on its type.
    groupedEntries[type].forEach(cleaners[type])
  }

  // Handle the tournament podiums and SWCC wins.
  groupedEntries.podium = await getTournamentsWithAuthor({ author, isPreview })
  groupedEntries.swcc = await getSWCCFromAuthor({ author, isPreview })

  // Restore the potential YouTube channel as an object.
  if (groupedEntries.channel) {
    groupedEntries.channel = groupedEntries.channel[0]
  }

  return groupedEntries
}

export default getContentFromAuthor
