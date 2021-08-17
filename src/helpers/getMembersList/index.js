import ARTWORKS from '~/data/artworks'
import CONTRIBUTIONS from '~/data/contributions'
import DECKS from '~/data/decks'
import DONATIONS from '~/data/donations'
import EVENTS from '~/data/events'
import GUIDES from '~/data/guides'
import PUZZLES from '~/data/puzzles'
import STORIES from '~/data/stories'
import TOURNAMENTS from '~/data/tournaments'
import VIDEOS from '~/data/videos'
import SWCC from '~/data/swcc'

const uniq = (myArr, prop) =>
  myArr.filter(
    (obj, pos, arr) =>
      arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  )

const addType = type => entity => ({ member: entity.author || entity, type })

const sortAlphabetically = (a, b) =>
  b.member.toLowerCase() > a.member.toLowerCase()
    ? -1
    : b.member.toLowerCase() < a.member.toLowerCase()
    ? +1
    : 0

const getMembersList = () =>
  uniq(
    [
      ...STORIES.map(addType('STORY')),
      ...VIDEOS.map(addType('VIDEO')),
      ...GUIDES.map(guide => guide.authors)
        .flat()
        .map(addType('GUIDE')),
      ...CONTRIBUTIONS.map(addType('CONTRIBUTION')),
      ...DONATIONS.map(addType('DONATION')),
      ...DECKS.map(addType('DECK')),
      ...ARTWORKS.map(addType('ARTWORK')),
      ...TOURNAMENTS.map(tournament => tournament.hosts)
        .flat()
        .map(addType('HOST')),
      ...TOURNAMENTS.map(tournament => tournament.podium)
        .flat(2)
        .map(addType('PODIUM')),
      ...SWCC.flat()
        .filter(week => week.winner)
        .map(week => week.winner.author)
        .map(addType('CARD')),
      ...PUZZLES.map(addType('PUZZLE')),
      ...EVENTS.map(event => event.authors)
        .flat()
        .map(addType('EVENT')),
    ],
    'member'
  ).sort(sortAlphabetically)

export default getMembersList
