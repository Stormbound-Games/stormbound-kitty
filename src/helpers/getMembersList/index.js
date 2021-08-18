import isKATMember from '~/helpers/isKATMember'
import ARTWORKS from '~/data/artworks'
import CONTRIBUTIONS from '~/data/contributions'
import DECKS from '~/data/decks'
import DONATIONS from '~/data/donations'
import EVENTS from '~/data/events'
import GUIDES from '~/data/guides'
import PODCASTS from '~/data/podcasts'
import PUZZLES from '~/data/puzzles'
import STORIES from '~/data/stories'
import TOURNAMENTS from '~/data/tournaments'
import SWCC from '~/data/swcc'

const sortAlphabetically = (a, b) =>
  b.member.toLowerCase() > a.member.toLowerCase()
    ? -1
    : b.member.toLowerCase() < a.member.toLowerCase()
    ? +1
    : 0

const getMembersList = () => {
  const members = {}

  ARTWORKS.forEach(artwork => {
    members[artwork.author] = members[artwork.author] || []
    members[artwork.author].push('ARTWORK')
  })
  CONTRIBUTIONS.forEach(contribution => {
    members[contribution.author] = members[contribution.author] || []
    contribution.entries.forEach(() => {
      members[contribution.author].push('CONTRIBUTION')
    })
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
  STORIES.forEach(story => {
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

  return Object.keys(members)
    .reduce((acc, member) => {
      const entries = members[member]
      const contributions = entries.filter(entry => entry === 'CONTRIBUTION')
      const donations = entries.filter(entry => entry === 'DONATION')

      return acc.concat({
        member,
        count: entries.length,
        roles: isKATMember({ contributions, donations }),
      })
    }, [])
    .sort(sortAlphabetically)
}

export default getMembersList
