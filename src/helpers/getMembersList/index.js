import isKATMember from '~/helpers/isKATMember'
import GUIDES from '~/data/guides'
import SWCC from '~/data/swcc'
import UPDATES from '~/data/updates'
import getArtworks from '~/api/artworks/getArtworks'
import getChannels from '~/api/channels/getChannels'
import getDecks from '~/api/decks/getDecks'
import getDonations from '~/api/donations/getDonations'
import getEvents from '~/api/events/getEvents'
import getPodcasts from '~/api/podcasts/getPodcasts'
import getPuzzles from '~/api/puzzles/getPuzzles'
import getStories from '~/api/stories/getStories'
import getTournaments from '~/api/tournaments/getTournaments'

const sortAlphabetically = (a, b) =>
  b.member.toLowerCase() > a.member.toLowerCase()
    ? -1
    : b.member.toLowerCase() < a.member.toLowerCase()
    ? +1
    : 0

const getMembersList = async () => {
  const members = {}
  const artworks = await getArtworks()
  const channels = await getChannels()
  const decks = await getDecks()
  const donations = await getDonations()
  const events = await getEvents()
  const podcasts = await getPodcasts()
  const puzzles = await getPuzzles()
  const stories = await getStories()
  const tournaments = await getTournaments()

  artworks.forEach(artwork => {
    members[artwork.author] = members[artwork.author] || []
    members[artwork.author].push('ARTWORK')
  })
  channels.forEach(channel => {
    members[channel.author] = members[channel.author] || []
    members[channel.author].push('CHANNEL')
  })
  decks.forEach(deck => {
    members[deck.author] = members[deck.author] || []
    members[deck.author].push('DECK')
  })
  donations.forEach(donation => {
    members[donation.author] = members[donation.author] || []
    members[donation.author].push('DONATION')
  })
  events.forEach(event => {
    members[event.author] = members[event.author] || []
    members[event.author].push('EVENT')
  })
  GUIDES.forEach(guide => {
    guide.authors.forEach(author => {
      members[author] = members[author] || []
      members[author].push('GUIDE')
    })
  })
  podcasts.forEach(podcast => {
    podcast.hosts.forEach(host => {
      members[host] = members[host] || []
      members[host].push('PODCAST')
    })
  })
  puzzles.forEach(puzzle => {
    members[puzzle.author] = members[puzzle.author] || []
    members[puzzle.author].push('PUZZLE')
  })
  stories.forEach(story => {
    members[story.author] = members[story.author] || []
    members[story.author].push('STORY')
  })
  SWCC.flat()
    .filter(week => week.winner)
    .forEach(week => {
      members[week.winner.author] = members[week.winner.author] || []
      members[week.winner.author].push('CONTEST')
    })
  tournaments.forEach(tournament => {
    tournament.hosts.forEach(host => {
      members[host] = members[host] || []
      members[host].push('HOST')
    })
    tournament.podium.flat().forEach(member => {
      members[member] = members[member] || []
      members[member].push('PODIUM')
    })
  })
  UPDATES.forEach(update => {
    members[update.author] = members[update.author] || []
    update.entries.forEach(() => {
      members[update.author].push('UPDATE')
    })
  })

  return Object.keys(members)
    .reduce((acc, member) => {
      // Members who have a YouTube channel should be returned as part of the
      // list of members, but having a channel shouldn’t be counted as a
      // contribution per se.
      const entries = members[member].filter(entry => entry !== 'CHANNEL')
      const updates = entries.filter(entry => entry === 'UPDATE')
      const donations = entries.filter(entry => entry === 'DONATION')

      return acc.concat({
        types: entries,
        member,
        count: entries.length,
        roles: isKATMember({ member, updates, donations }),
      })
    }, [])
    .sort(sortAlphabetically)
}

export default getMembersList
