import isKATMember from '~/helpers/isKATMember'
import getArtworks from '~/api/artworks/getArtworks'
import getChannels from '~/api/channels/getChannels'
import getContributions from '~/api/contributions/getContributions'
import getDecks from '~/api/decks/getDecks'
import getDonations from '~/api/donations/getDonations'
import getEvents from '~/api/events/getEvents'
import getGuides from '~/api/guides/getGuides'
import getPodcasts from '~/api/podcasts/getPodcasts'
import getPuzzles from '~/api/puzzles/getPuzzles'
import getStories from '~/api/stories/getStories'
import getSWCCSeasons from '~/api/swcc/getSWCCSeasons'
import getTournaments from '~/api/tournaments/getTournaments'

const sortAlphabetically = (a, b) =>
  b.member.toLowerCase() > a.member.toLowerCase()
    ? -1
    : b.member.toLowerCase() < a.member.toLowerCase()
    ? +1
    : 0

const getMembersList = async ({ isPreview } = {}) => {
  const members = {}
  const artworks = await getArtworks({ isPreview })
  const channels = await getChannels({ isPreview })
  const contributions = await getContributions({ isPreview })
  const decks = await getDecks({ isPreview })
  const donations = await getDonations({ isPreview })
  const events = await getEvents({ isPreview })
  const guides = await getGuides({ isPreview })
  const podcasts = await getPodcasts({ isPreview })
  const puzzles = await getPuzzles({ isPreview })
  const stories = await getStories({ isPreview })
  const swcc = await getSWCCSeasons({ isPreview })
  const tournaments = await getTournaments({ isPreview })

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
  guides.forEach(guide => {
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
  swcc
    .map(swcc => swcc.weeks)
    .flat()
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
  contributions.forEach(contribution => {
    members[contribution.author] = members[contribution.author] || []
    contribution.entries.forEach(() => {
      members[contribution.author].push('CONTRIBUTION')
    })
  })

  return Object.keys(members)
    .reduce((acc, member) => {
      // Members who have a YouTube channel should be returned as part of the
      // list of members, but having a channel shouldn’t be counted as a
      // contribution per se.
      const entries = members[member].filter(entry => entry !== 'CHANNEL')
      const contributions = entries.filter(entry => entry === 'CONTRIBUTION')
      const donations = entries.filter(entry => entry === 'DONATION')

      return acc.concat({
        types: entries,
        member,
        count: entries.length,
        roles: isKATMember({ member, contributions, donations }),
      })
    }, [])
    .sort(sortAlphabetically)
}

export default getMembersList
