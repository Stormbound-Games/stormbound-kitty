import capitalise from '../helpers/capitalise'
import parseDate from '../helpers/parseDate'
import DECKS from '../data/decks'
import CONTRIBUTIONS from '../data/contributions'
import DONATIONS from '../data/donations'
import GUIDES from '../data/guides'
import STORIES from '../data/stories'
import TOURNAMENTS from '../data/tournaments'
import ARTWORKS from '../data/artworks'
import PUZZLES from '../data/puzzles'
import EVENTS from '../data/events'
import RELEASES from '../data/releases'
import PODCASTS from '../data/podcasts'
import SWCC from '../data/swcc'

const formatEntryWithDate = entry => ({
  ...entry,
  date: entry.date ? parseDate(entry.date) : entry.date,
})

const useUserStories = id =>
  STORIES.filter(story => story.date && story.author.toLowerCase() === id).map(
    formatEntryWithDate
  )

const useUserDecks = id =>
  DECKS.filter(deck => deck.author.toLowerCase() === id).map(
    formatEntryWithDate
  )

const useUserGuides = id =>
  GUIDES.filter(guide =>
    guide.authors.map(host => host.toLowerCase()).includes(id)
  ).map(formatEntryWithDate)

const useUserHosts = id =>
  TOURNAMENTS.filter(tournament =>
    tournament.hosts.map(host => host.toLowerCase()).includes(id)
  ).map(formatEntryWithDate)

const useUserPodcasts = id =>
  PODCASTS.filter(episode =>
    episode.hosts.map(host => host.toLocaleLowerCase()).includes(id)
  ).map(formatEntryWithDate)

const useUserPodiums = id =>
  TOURNAMENTS.filter(tournament =>
    tournament.podium
      .flat()
      .map(winner => winner.toLowerCase())
      .includes(id)
  ).map(formatEntryWithDate)

const useUserArtworks = id =>
  ARTWORKS.filter(artwork => artwork.author.toLowerCase() === id).map(
    formatEntryWithDate
  )

const useUserPuzzles = id =>
  PUZZLES.filter(puzzle => puzzle.author.toLowerCase() === id).map(
    formatEntryWithDate
  )

const useUserCards = id =>
  SWCC.flat()
    .filter(
      contest => contest.winner && contest.winner.author.toLowerCase() === id
    )
    .map(entry => {
      const [day, month, year] = entry.date.split('/').map(Number)

      return { ...entry, date: new Date(year, month - 1, day) }
    })

const useUserDonations = id =>
  DONATIONS.filter(donation => donation.author.toLowerCase() === id).map(
    formatEntryWithDate
  )

const useUserContributions = id =>
  CONTRIBUTIONS.filter(
    contribution => contribution.author.toLowerCase() === id
  ).map(formatEntryWithDate)

const useUserEvents = id =>
  EVENTS.filter(event =>
    event.authors.map(author => author.toLowerCase()).includes(id)
  )
    .concat(id === 'kitty' ? RELEASES.map(addType('RELEASE')) : [])
    .map(formatEntryWithDate)

const addType = type => entry => ({ ...entry, type })

const useMemberContent = id => {
  const stories = useUserStories(id)
  const decks = useUserDecks(id)
  const guides = useUserGuides(id)
  const hosts = useUserHosts(id)
  const podiums = useUserPodiums(id)
  const artworks = useUserArtworks(id)
  const puzzles = useUserPuzzles(id)
  const cards = useUserCards(id)
  const contributions = useUserContributions(id)
  const donations = useUserDonations(id)
  const events = useUserEvents(id)
  const podcasts = useUserPodcasts(id)

  const content = [
    ...stories.map(addType('STORY')),
    ...guides.map(addType('GUIDE')),
    ...decks.map(addType('DECK')),
    ...hosts.map(addType('HOST')),
    ...podiums.map(addType('PODIUM')),
    ...artworks.map(addType('ART')),
    ...puzzles.map(addType('PUZZLE')),
    ...cards.map(addType('CARD')),
    ...contributions.map(addType('CONTRIBUTION')),
    ...donations.map(addType('DONATION')),
    ...podcasts.map(addType('PODCAST')),
    ...events,
  ].sort((a, b) => b.date - a.date)

  const findDisplayName = author => author.toLowerCase() === id
  // This is incredibly ugly, but this is kind of the only way to find the
  // correct capitalisation since it cannot be retrieved from the URL parameter
  // unfortunately.
  const displayName =
    content.map(
      ({ author, authors = [], hosts = [], podium = [], winner = {} }) =>
        author ||
        [...authors, ...hosts, ...podium.flat()].find(findDisplayName) ||
        winner.author
    )[0] || capitalise(id)

  // The count is not quite the length of the `content` array as some entries
  // such as code updates can hold multiple contributions (e.g. one per PR).
  const count = content.reduce(
    (acc, item) => acc + (item.entries ? item.entries.length : 1),
    0
  )

  return {
    displayName,
    content,
    count,
    details: {
      artworks,
      cards,
      contributions,
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

export default useMemberContent
