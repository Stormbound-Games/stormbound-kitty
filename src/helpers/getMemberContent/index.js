import capitalize from '~/helpers/capitalize'
import parseDate from '~/helpers/parseDate'
import isKATMember from '~/helpers/isKATMember'
import GUIDES from '~/data/guides'
import getChannel from '~/api/channels/getChannel'
import getArtworksFromAuthor from '~/api/artworks/getArtworksFromAuthor'
import getContributionsFromAuthor from '~/api/contributions/getContributionsFromAuthor'
import getDecksFromAuthor from '~/api/decks/getDecksFromAuthor'
import getDonationsFromAuthor from '~/api/donations/getDonationsFromAuthor'
import getEventsFromAuthor from '~/api/events/getEventsFromAuthor'
import getPodcastsFromAuthor from '~/api/podcasts/getPodcastsFromAuthor'
import getPuzzlesFromAuthor from '~/api/puzzles/getPuzzlesFromAuthor'
import getStoriesFromAuthor from '~/api/stories/getStoriesFromAuthor'
import getSWCCFromAuthor from '~/api/swcc/getSWCCFromAuthor'
import getTournamentsFromAuthor from '~/api/tournaments/getTournamentsFromAuthor'
import getTournamentsWithAuthor from '~/api/tournaments/getTournamentsWithAuthor'

const formatEntryWithDate = entry => ({
  ...entry,
  date: entry.date ? parseDate(entry.date).valueOf() : entry.date,
})

const getUserGuides = id =>
  GUIDES.filter(guide =>
    guide.authors.map(host => host.toLowerCase()).includes(id)
  ).map(formatEntryWithDate)

const addType = type => entry => ({ ...entry, type })

const getMemberContent = async ({ id, isPreview } = {}) => {
  const channel = await getChannel({ author: id, isPreview })
  const artworks = (await getArtworksFromAuthor({ author: id, isPreview })).map(
    formatEntryWithDate
  )
  const cards = (await getSWCCFromAuthor({ author: id, isPreview })).map(
    formatEntryWithDate
  )
  const contributions = (
    await getContributionsFromAuthor({ author: id, isPreview })
  ).map(formatEntryWithDate)
  const decks = (await getDecksFromAuthor({ author: id, isPreview })).map(
    formatEntryWithDate
  )
  const donations = (
    await getDonationsFromAuthor({ author: id, isPreview })
  ).map(formatEntryWithDate)
  const events = (await getEventsFromAuthor({ author: id, isPreview })).map(
    formatEntryWithDate
  )
  const hosts = (await getTournamentsFromAuthor({ author: id, isPreview })).map(
    formatEntryWithDate
  )
  const podcasts = (await getPodcastsFromAuthor({ author: id, isPreview })).map(
    formatEntryWithDate
  )
  const podiums = (
    await getTournamentsWithAuthor({ author: id, isPreview })
  ).map(formatEntryWithDate)
  const puzzles = (await getPuzzlesFromAuthor({ author: id, isPreview })).map(
    formatEntryWithDate
  )
  const stories = (await getStoriesFromAuthor({ author: id, isPreview })).map(
    formatEntryWithDate
  )
  const guides = getUserGuides(id)

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
  const displayName = channel
    ? channel.author
    : content.map(
        ({ author, authors = [], hosts = [], podium = [], winner = {} }) =>
          author ||
          [...authors, ...hosts, ...podium.flat()].find(findDisplayName) ||
          winner.author
      )[0] || capitalize(id)

  // The count is not quite the length of the `content` array as some entries
  // such as code contributions can hold multiple contributions (e.g. one per
  // PR).
  const count = content.reduce(
    (acc, item) => acc + (item.entries ? item.entries.length : 1),
    0
  )

  return {
    roles: isKATMember({ member: id, donations, contributions }),
    channel,
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

export default getMemberContent
