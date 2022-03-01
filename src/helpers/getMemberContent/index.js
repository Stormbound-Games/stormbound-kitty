import capitalize from '~/helpers/capitalize'
import parseDate from '~/helpers/parseDate'
import isKATMember from '~/helpers/isKATMember'
import getContentFromUser from '~/api/users/getContentFromUser'

const parseEntryDate = entry => ({
  ...entry,
  date: entry.date ? parseDate(entry.date).valueOf() : entry.date,
})

const addType = type => entry => ({ ...entry, type })

const getMemberContent = async ({ id, isPreview } = {}) => {
  const {
    channel = null,
    artwork: artworks = [],
    swcc: cards = [],
    contribution: contributions = [],
    deck: decks = [],
    donation: donations = [],
    event: events = [],
    guide: guides = [],
    podcast: podcasts = [],
    tournament: hosts = [],
    podium: podiums = [],
    puzzle: puzzles = [],
    story: stories = [],
  } = await getContentFromUser({ author: id, isPreview })

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
  ]
    .map(parseEntryDate)
    .sort((a, b) => b.date - a.date)

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
