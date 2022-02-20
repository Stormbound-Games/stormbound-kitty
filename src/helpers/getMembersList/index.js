import isKATMember from '~/helpers/isKATMember'
import ARTWORKS from '~/data/artworks'
import CHANNELS from '~/data/channels'
import DECKS from '~/data/decks'
import DONATIONS from '~/data/donations'
import EVENTS from '~/data/events'
import GUIDES from '~/data/guides'
import PODCASTS from '~/data/podcasts'
import PUZZLES from '~/data/puzzles'
import SWCC from '~/data/swcc'
import TOURNAMENTS from '~/data/tournaments'
import UPDATES from '~/data/updates'
import getStories from '~/api/stories/getStories'

const sortAlphabetically = (a, b) =>
  b.member.toLowerCase() > a.member.toLowerCase()
    ? -1
    : b.member.toLowerCase() < a.member.toLowerCase()
    ? +1
    : 0

const getMembersList = async () => {
  const members = {}
  const stories = await getStories()

  ARTWORKS.forEach(artwork => {
    members[artwork.author] = members[artwork.author] || []
    members[artwork.author].push('ARTWORK')
  })
  CHANNELS.forEach(channel => {
    members[channel.author] = members[channel.author] || []
    members[channel.author].push('CHANNEL')
  })
  DECKS.forEach(deck => {
    members[deck.author] = members[deck.author] || []
    members[deck.author].push('DECK')
  })
  DONATIONS.forEach(donation => {
    members[donation.author] = members[donation.author] || []
    members[donation.author].push('DONATION')
  })
  EVENTS.forEach(event => {
    members[event.author] = members[event.author] || []
    members[event.author].push('EVENT')
  })
  GUIDES.forEach(guide => {
    guide.authors.forEach(author => {
      members[author] = members[author] || []
      members[author].push('GUIDE')
    })
  })
  PODCASTS.forEach(podcast => {
    podcast.hosts.forEach(host => {
      members[host] = members[host] || []
      members[host].push('PODCAST')
    })
  })
  PUZZLES.forEach(puzzle => {
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
  TOURNAMENTS.forEach(tournament => {
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
