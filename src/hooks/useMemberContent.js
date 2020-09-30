import useFetch from './useFetch'
import decks from '../data/decks'
import guides from '../data/guides'
import tournaments from '../data/tournaments'
import art from '../data/art'
import puzzles from '../data/puzzles'
import events from '../data/events'

import { SWCC_SEASON_1, SWCC_SEASON_2, DONATORS } from '../constants/misc'

const formatEntryWithDate = entry => {
  if (!entry.date) return entry

  const [month, year] = entry.date.split('/')

  return { ...entry, date: new Date(+year, +month - 1, 1) }
}

const useUserStories = id => {
  const { data: stories = [] } = useFetch('/stories.json')
  return stories
    .filter(story => story.date && story.author.toLowerCase() === id)
    .map(formatEntryWithDate)
}

const useUserDecks = id =>
  decks
    .filter(deck => deck.author.toLowerCase() === id)
    .map(formatEntryWithDate)

const useUserGuides = id =>
  guides
    .filter(guide => guide.authors.map(host => host.toLowerCase()).includes(id))
    .map(formatEntryWithDate)

const useUserHosts = id =>
  tournaments
    .filter(tournament =>
      tournament.hosts.map(host => host.toLowerCase()).includes(id)
    )
    .map(formatEntryWithDate)

const useUserPodiums = id =>
  tournaments
    .filter(tournament =>
      tournament.podium
        .flat()
        .map(winner => winner.toLowerCase())
        .includes(id)
    )
    .map(formatEntryWithDate)

const useUserArtworks = id =>
  art.filter(art => art.author.toLowerCase() === id).map(formatEntryWithDate)

const useUserPuzzles = id =>
  puzzles
    .filter(puzzle => puzzle.author.toLowerCase() === id)
    .map(formatEntryWithDate)
const useUserCards = id =>
  SWCC_SEASON_1.filter(contest => contest.winner.author.toLowerCase() === id)
    .map(entry => ({
      ...entry,
      date: new Date(2019, 0, 1 + (entry.week - 1) * 7),
    }))
    .concat(
      SWCC_SEASON_2.filter(
        contest => contest.winner && contest.winner.author.toLowerCase() === id
      ).map(entry => ({
        ...entry,
        date: new Date(2020, 0, 1 + (entry.week - 1) * 7),
      }))
    )

const useUserDonations = id =>
  DONATORS.filter(donation => donation.author.toLowerCase() === id).map(
    formatEntryWithDate
  )

const useUserEvents = id =>
  events
    .filter(
      event =>
        (event.author && event.author.toLowerCase() === id) ||
        (Array.isArray(event.authors) &&
          event.authors.map(author => author.toLowerCase()).includes(id))
    )
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
  const donations = useUserDonations(id)
  const events = useUserEvents(id)

  const content = [
    ...stories.map(addType('STORY')),
    ...guides.map(addType('GUIDE')),
    ...decks.map(addType('DECK')),
    ...hosts.map(addType('HOST')),
    ...podiums.map(addType('PODIUM')),
    ...artworks.map(addType('ART')),
    ...puzzles.map(addType('PUZZLE')),
    ...cards.map(addType('CARD')),
    ...donations.map(addType('DONATION')),
    ...events,
  ].sort((a, b) => b.date - a.date)

  return {
    content,
    details: {
      stories,
      decks,
      guides,
      hosts,
      podiums,
      artworks,
      puzzles,
      cards,
      donations,
      events,
    },
  }
}

export default useMemberContent
