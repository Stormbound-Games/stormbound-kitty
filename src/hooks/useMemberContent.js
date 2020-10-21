import React from 'react'
import { StoriesContext } from '../components/StoriesProvider'
import capitalise from '../helpers/capitalise'
import decks from '../data/decks'
import donations from '../data/donations'
import guides from '../data/guides'
import tournaments from '../data/tournaments'
import artworks from '../data/artworks'
import puzzles from '../data/puzzles'
import events from '../data/events'
import releases from '../data/releases'
import podcasts from '../data/podcasts'
import { SWCC_SEASON_1, SWCC_SEASON_2 } from '../constants/misc'

const formatEntryWithDate = entry => {
  if (!entry.date) return entry

  const [month, year] = entry.date.split('/')

  return { ...entry, date: new Date(+year, +month - 1, 1) }
}

const useUserStories = id => {
  const stories = React.useContext(StoriesContext)

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

const useUserPodcasts = id =>
  podcasts
    .filter(episode =>
      episode.hosts.map(host => host.toLocaleLowerCase()).includes(id)
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
  artworks
    .filter(artwork => artwork.author.toLowerCase() === id)
    .map(formatEntryWithDate)

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
  donations
    .filter(donation => donation.author.toLowerCase() === id)
    .map(formatEntryWithDate)

const useUserEvents = id =>
  events
    .filter(event =>
      event.authors.map(author => author.toLowerCase()).includes(id)
    )
    .concat(id === 'kitty' ? releases.map(addType('RELEASE')) : [])
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
    ...donations.map(addType('DONATION')),
    ...podcasts.map(addType('PODCAST')),
    ...events,
  ].sort((a, b) => b.date - a.date)

  const findDisplayName = author => author.toLowerCase() === id
  // This is incredibly ugly, but this is kind of the only way to find the
  // correct capitalisation since it cannot be retrieved from the URL parameter
  // unfortunately.
  const displayName =
    stories[0]?.author ??
    decks[0]?.author ??
    puzzles[0]?.author ??
    artworks[0]?.author ??
    donations[0]?.author ??
    events[0]?.authors.find(findDisplayName) ??
    guides[0]?.authors.find(findDisplayName) ??
    hosts[0]?.hosts.find(findDisplayName) ??
    podcasts[0]?.hosts.find(findDisplayName) ??
    podiums[0]?.podium.flat().find(findDisplayName) ??
    cards[0]?.winner.author ??
    capitalise(id)

  return {
    displayName,
    content,
    details: {
      artworks,
      cards,
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
