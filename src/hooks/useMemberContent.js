import React from 'react'
import { StoriesContext } from '../components/StoriesProvider'
import capitalise from '../helpers/capitalise'
import decks from '../data/decks'
import contributions from '../data/contributions'
import donations from '../data/donations'
import guides from '../data/guides'
import tournaments from '../data/tournaments'
import artworks from '../data/artworks'
import puzzles from '../data/puzzles'
import events from '../data/events'
import releases from '../data/releases'
import podcasts from '../data/podcasts'
import swcc from '../data/swcc'

const formatEntryWithDate = entry => {
  if (!entry.date) return entry

  const [month, year] = entry.date.split('/')

  return { ...entry, date: new Date(+year, +month - 1, 1) }
}

const useUserStories =
  typeof window !== 'undefined'
    ? id =>
        React.useContext(StoriesContext)
          .filter(story => story.date && story.author.toLowerCase() === id)
          .map(formatEntryWithDate)
    : (id, _stories) =>
        _stories
          .filter(story => story.date && story.author.toLowerCase() === id)
          .map(formatEntryWithDate)

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
  swcc
    .flat()
    .filter(
      contest => contest.winner && contest.winner.author.toLowerCase() === id
    )
    .map(entry => {
      const [day, month, year] = entry.date.split('/').map(Number)

      return { ...entry, date: new Date(year, month - 1, day) }
    })

const useUserDonations = id =>
  donations
    .filter(donation => donation.author.toLowerCase() === id)
    .map(formatEntryWithDate)

const useUserContributions = id =>
  contributions
    .filter(contribution => contribution.author.toLowerCase() === id)
    .map(formatEntryWithDate)

const useUserEvents = id =>
  events
    .filter(event =>
      event.authors.map(author => author.toLowerCase()).includes(id)
    )
    .concat(id === 'kitty' ? releases.map(addType('RELEASE')) : [])
    .map(formatEntryWithDate)

const addType = type => entry => ({ ...entry, type })

// This hook is being used a regular function by the `member` command from the
// Discord bot. The latter cannot rely on the React context, so the stories are
// provided to the function itself in that case.
const useMemberContent = (id, _stories = []) => {
  const stories = useUserStories(id, _stories)
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
