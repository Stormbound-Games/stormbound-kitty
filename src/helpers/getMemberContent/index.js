import capitalize from '~/helpers/capitalize'
import parseDate from '~/helpers/parseDate'
import isKATMember from '~/helpers/isKATMember'
import DECKS from '~/data/decks'
import UPDATES from '~/data/updates'
import DONATIONS from '~/data/donations'
import GUIDES from '~/data/guides'
import EVENTS from '~/data/events'
import RELEASES from '~/data/releases'
import PODCASTS from '~/data/podcasts'
import SWCC from '~/data/swcc'
import getChannel from '~/api/channels/getChannel'
import getArtworksFromAuthor from '~/api/artworks/getArtworksFromAuthor'
import getPuzzlesFromAuthor from '~/api/puzzles/getPuzzlesFromAuthor'
import getStoriesFromAuthor from '~/api/stories/getStoriesFromAuthor'
import getTournamentsFromAuthor from '~/api/tournaments/getTournamentsFromAuthor'
import getTournamentsWithAuthor from '~/api/tournaments/getTournamentsWithAuthor'

const formatEntryWithDate = entry => ({
  ...entry,
  date: entry.date ? parseDate(entry.date).valueOf() : entry.date,
})

const getUserDecks = id =>
  DECKS.filter(deck => deck.author.toLowerCase() === id).map(
    formatEntryWithDate
  )

const getUserGuides = id =>
  GUIDES.filter(guide =>
    guide.authors.map(host => host.toLowerCase()).includes(id)
  ).map(formatEntryWithDate)

const getUserPodcasts = id =>
  PODCASTS.filter(episode =>
    episode.hosts.map(host => host.toLocaleLowerCase()).includes(id)
  ).map(formatEntryWithDate)

const getUserCards = id =>
  SWCC.flat()
    .filter(
      contest => contest.winner && contest.winner.author.toLowerCase() === id
    )
    .map(entry => {
      const [day, month, year] = entry.date.split('/').map(Number)

      return { ...entry, date: new Date(year, month - 1, day).valueOf() }
    })

const getUserDonations = id =>
  DONATIONS.filter(donation => donation.author.toLowerCase() === id).map(
    formatEntryWithDate
  )

const getUserUpdates = id =>
  UPDATES.filter(update => update.author.toLowerCase() === id).map(
    formatEntryWithDate
  )

const getUserEvents = id =>
  EVENTS.filter(event =>
    event.authors.map(author => author.toLowerCase()).includes(id)
  )
    .concat(id === 'kitty' ? RELEASES.map(addType('RELEASE')) : [])
    .map(formatEntryWithDate)

const addType = type => entry => ({ ...entry, type })

const getMemberContent = async id => {
  const channel = await getChannel(id)
  const artworks = (await getArtworksFromAuthor(id)).map(formatEntryWithDate)
  const hosts = (await getTournamentsFromAuthor(id)).map(formatEntryWithDate)
  const podiums = (await getTournamentsWithAuthor(id)).map(formatEntryWithDate)
  const puzzles = (await getPuzzlesFromAuthor(id)).map(formatEntryWithDate)
  const stories = (await getStoriesFromAuthor(id)).map(formatEntryWithDate)
  const decks = getUserDecks(id)
  const guides = getUserGuides(id)
  const cards = getUserCards(id)
  const updates = getUserUpdates(id)
  const donations = getUserDonations(id)
  const events = getUserEvents(id)
  const podcasts = getUserPodcasts(id)

  const content = [
    ...stories.map(addType('STORY')),
    ...guides.map(addType('GUIDE')),
    ...decks.map(addType('DECK')),
    ...hosts.map(addType('HOST')),
    ...podiums.map(addType('PODIUM')),
    ...artworks.map(addType('ART')),
    ...puzzles.map(addType('PUZZLE')),
    ...cards.map(addType('CARD')),
    ...updates.map(addType('UPDATE')),
    ...donations.map(addType('DONATION')),
    ...podcasts.map(addType('PODCAST')),
    ...events,
  ].sort((a, b) => b.date - a.date)

  const findDisplayName = author => author.toLowerCase() === id
  // This is incredibly ugly, but this is kind of the only way to find the
  // correct capitalisation since it cannot be retrieved from the URL parameter
  // unfortunately.
  const displayName = channel
    ? channel.author
    : content.map(
        ({ author, authors = [], hosts = [], podium = [], winner = {} }) =>
          author ||
          [...authors, ...hosts, ...podium.flat()].find(findDisplayName) ||
          winner.author
      )[0] || capitalize(id)

  // The count is not quite the length of the `content` array as some entries
  // such as code updates can hold multiple updates (e.g. one per PR).
  const count = content.reduce(
    (acc, item) => acc + (item.entries ? item.entries.length : 1),
    0
  )

  return {
    roles: isKATMember({ member: id, donations, updates }),
    channel,
    displayName,
    content,
    count,
    details: {
      artworks,
      cards,
      updates,
      decks,
      donations,
      events,
      guides,
      hosts,
      podcasts,
      podiums,
      puzzles,
      stories,
    },
  }
}

export default getMemberContent
