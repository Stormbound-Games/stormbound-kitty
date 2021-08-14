import artworks from '../data/artworks'
import contributions from '../data/contributions'
import decks from '../data/decks'
import donations from '../data/donations'
import events from '../data/events'
import guides from '../data/guides'
import puzzles from '../data/puzzles'
import tournaments from '../data/tournaments'
import videos from '../data/videos'
import swcc from '../data/swcc'

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

// Stories live in a file outside of the `src` directory (because generated) and
// therefore cannot be imported. It has to be passed from the surrounding
// context (React within the app, or the sitemap script).
const useMembersList = (stories = []) =>
  uniq(
    [
      ...stories.map(addType('STORY')),
      ...videos.map(addType('VIDEO')),
      ...guides
        .map(guide => guide.authors)
        .flat()
        .map(addType('GUIDE')),
      ...contributions.map(addType('CONTRIBUTION')),
      ...donations.map(addType('DONATION')),
      ...decks.map(addType('DECK')),
      ...artworks.map(addType('ARTWORK')),
      ...tournaments
        .map(tournament => tournament.hosts)
        .flat()
        .map(addType('HOST')),
      ...tournaments
        .map(tournament => tournament.podium)
        .flat(2)
        .map(addType('PODIUM')),
      ...swcc
        .flat()
        .filter(week => week.winner)
        .map(week => week.winner.author)
        .map(addType('CARD')),
      ...puzzles.map(addType('PUZZLE')),
      ...events
        .map(event => event.authors)
        .flat()
        .map(addType('EVENT')),
    ],
    'member'
  ).sort(sortAlphabetically)

export default useMembersList
