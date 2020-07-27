import FuzzySearch from 'fuzzy-search'
import cards from '../../data/cards'
import decks from '../../data/decks'
import guides from '../../data/guides'
import puzzles from '../../data/puzzles'
import { BRAWLS } from '../../constants/brawl'
import { CATEGORIES } from '../../constants/guides'
import { STORY_CATEGORIES } from '../../constants/stories'
import { WEEKLY_CARD_CONTEST } from '../../constants/misc'

export const SEARCH_INDEX = []
const MEMBERS = [
  ...new Set([
    ...puzzles.map(puzzle => puzzle.author),
    ...decks.map(deck => deck.author),
    ...WEEKLY_CARD_CONTEST.filter(contest => contest.winner.author),
    ...guides.reduce((authors, guide) => authors.concat(guide.authors), []),
  ]),
]

cards
  .filter(card => !card.token)
  .forEach(card => {
    SEARCH_INDEX.push({
      path: `/card/${card.id}/display`,
      label: card.name,
      breadcrumbs: ['Card Builder', 'Display'],
    })
  })

SEARCH_INDEX.push({
  path: `/card/stats`,
  label: 'Card Statistics',
  breadcrumbs: ['Card Builder', 'Statistics'],
})

decks.forEach(deck => {
  SEARCH_INDEX.push({
    path: `/deck/${deck.id}/detail`,
    label: `${deck.name} by ${deck.author}`,
    breadcrumbs: ['Decks', 'Insights'],
  })
})

Object.keys(CATEGORIES).forEach(id => {
  SEARCH_INDEX.push({
    path: `/guides/${CATEGORIES[id].slug}`,
    label: CATEGORIES[id].name.long,
    breadcrumbs: ['Guides', CATEGORIES[id].name.short],
  })
})

guides.forEach(guide => {
  SEARCH_INDEX.push({
    path: `/guides/${guide.slug}`,
    label: guide.name,
    breadcrumbs: ['Guides', CATEGORIES[guide.category].name.short],
  })
})

SEARCH_INDEX.push({
  path: '/sim/puzzles',
  label: 'Puzzles',
  breadcrumbs: ['Battle Sim', 'Puzzles'],
})
puzzles.forEach(puzzle => {
  SEARCH_INDEX.push({
    path: `/sim/${puzzle.board}`,
    label: puzzle.name,
    breadcrumbs: ['Battle Sim', 'Puzzles'],
  })
})

SEARCH_INDEX.push({
  path: '/faq',
  label: 'Frequently Asked Questions',
  breadcrumbs: ['Home', 'FAQ'],
})

SEARCH_INDEX.push({
  path: '/fan-kit',
  label: 'Fan-kit',
  breadcrumbs: ['Home', 'Fan-Kit'],
})

SEARCH_INDEX.push({
  path: '/changelog',
  label: 'Changelog',
  breadcrumbs: ['Home', 'Changelog'],
})

SEARCH_INDEX.push({
  path: '/changelog/07-2020',
  label: 'Changelog July 2020',
  breadcrumbs: ['Home', 'Changelog'],
})

SEARCH_INDEX.push({
  path: '/income-calculator',
  label: 'Income Calculator',
  breadcrumbs: ['Home', 'Income Calculator'],
})

SEARCH_INDEX.push({
  path: '/list/ranked',
  label: 'Ranked Tier List',
  breadcrumbs: ['List Builder', 'Ranked'],
})
SEARCH_INDEX.push({
  path: '/list/equals',
  label: 'Equals Tier List',
  breadcrumbs: ['List Builder', 'Equals'],
})

// Add all individual brawl pages to the index.
BRAWLS.forEach(brawl => {
  SEARCH_INDEX.push({
    path: '/brawl/' + brawl.id.toLowerCase().replace(/_/g, '-'),
    label: brawl.label,
    breadcrumbs: ['Brawl', brawl.title],
  })
})

SEARCH_INDEX.push({
  path: '/collection',
  label: 'Collection',
  breadcrumbs: ['Collection', 'Index'],
})

SEARCH_INDEX.push({
  path: '/collection/books',
  label: 'Books Drawing Calculator',
  breadcrumbs: ['Collection', 'Books'],
})

SEARCH_INDEX.push({
  path: '/collection/stats',
  label: 'Collection Statistics',
  breadcrumbs: ['Collection', 'Statistics'],
})

SEARCH_INDEX.push({
  path: '/deck/suggestions',
  label: 'Deck Suggestions',
  breadcrumbs: ['Decks', 'Suggestions'],
})

SEARCH_INDEX.push({
  path: '/deck',
  label: 'Deck Builder',
  breadcrumbs: ['Decks', 'Editor'],
})

SEARCH_INDEX.push({
  path: '/deck/collection',
  label: 'Your Personal Decks',
  breadcrumbs: ['Decks', 'Collection'],
})

SEARCH_INDEX.push({
  path: '/quest',
  label: 'Quest Builder',
  breadcrumbs: ['Home', 'Quest Builder'],
})

SEARCH_INDEX.push({
  path: '/donate',
  label: 'Donate',
  breadcrumbs: ['Home', 'Donate'],
})

Object.keys(STORY_CATEGORIES).forEach(id => {
  SEARCH_INDEX.push({
    path: `/stories/${id}`,
    label: STORY_CATEGORIES[id].title,
    breadcrumbs: ['Stories', STORY_CATEGORIES[id].shortName],
  })
})

MEMBERS.forEach(member => {
  SEARCH_INDEX.push({
    path: `/member/${member}`,
    label: member,
    breadcrumbs: ['Home', 'Member'],
  })
})

export default new FuzzySearch(SEARCH_INDEX, ['label'], {
  caseSensitive: false,
  sort: true,
})
