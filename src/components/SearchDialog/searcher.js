import FuzzySearch from 'fuzzy-search'
import cards from '../../data/cards'
import decks from '../../data/decks'
import guides from '../../data/guides'
import puzzles from '../../data/puzzles'
import { BRAWLS } from '../../constants/brawl'
import { CATEGORIES } from '../../constants/guides'
import { STORY_CATEGORIES } from '../../constants/stories'
import { SWCC_SEASON_1, SWCC_SEASON_2 } from '../../constants/misc'

export const SEARCH_INDEX = []
const MEMBERS = [
  ...new Set([
    ...puzzles.map(puzzle => puzzle.author),
    ...decks.map(deck => deck.author),
    ...[...SWCC_SEASON_1, ...SWCC_SEASON_2].filter(
      contest => contest.winner && contest.winner.author
    ),
    ...guides.reduce((authors, guide) => authors.concat(guide.authors), []),
  ]),
]

cards
  .filter(card => !card.token)
  .forEach(card => {
    SEARCH_INDEX.push({
      path: `/card/${card.id}/display`,
      label: card.name,
      breadcrumbs: ['Tools', 'Card Builder', 'Display'],
    })
  })

SEARCH_INDEX.push({
  path: '/card',
  label: 'Card Builder',
  breadcrumbs: ['Tools', 'Card Builder'],
})

SEARCH_INDEX.push({
  path: `/card/stats`,
  label: 'Card Statistics',
  breadcrumbs: ['Game', 'Card Statistics'],
})

decks.forEach(deck => {
  SEARCH_INDEX.push({
    path: `/deck/${deck.id}/detail`,
    label: `${deck.name} by ${deck.author}`,
    breadcrumbs: ['Tools', 'Deck Builder', 'Insights'],
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
  path: `/sim`,
  label: 'Battle Sim',
  breadcrumbs: ['Tools', 'Battle Sim', 'Editor'],
})
SEARCH_INDEX.push({
  path: '/sim/puzzles',
  label: 'Puzzles',
  breadcrumbs: ['Tools', 'Battle Sim', 'Puzzles'],
})
puzzles.forEach(puzzle => {
  SEARCH_INDEX.push({
    path: `/sim/${puzzle.board}`,
    label: puzzle.name,
    breadcrumbs: ['Community', 'Puzzles'],
  })
})

SEARCH_INDEX.push({
  path: '/faq',
  label: 'Frequently Asked Questions',
  breadcrumbs: ['Community', 'FAQ'],
})

SEARCH_INDEX.push({
  path: '/fan-kit/cards',
  label: 'Fan-kit — Cards',
  breadcrumbs: ['Game', 'Fan-Kit', 'Cards'],
})

SEARCH_INDEX.push({
  path: '/fan-kit/books',
  label: 'Fan-kit — Books',
  breadcrumbs: ['Game', 'Fan-Kit', 'Books'],
})

SEARCH_INDEX.push({
  path: '/fan-kit/wallpapers',
  label: 'Fan-kit — Wallpapers',
  breadcrumbs: ['Game', 'Fan-Kit', 'Wallpapers'],
})

SEARCH_INDEX.push({
  path: '/changelog/cards',
  label: 'Card Changes',
  breadcrumbs: ['Game', 'Changelog'],
})

SEARCH_INDEX.push({
  path: '/changelog/releases',
  label: 'Releases Notes',
  breadcrumbs: ['Game', 'Changelog'],
})

SEARCH_INDEX.push({
  path: '/changelog/07-2020',
  label: 'July 2020 release',
  breadcrumbs: ['Game', 'Changelog'],
})

SEARCH_INDEX.push({
  path: '/changelog/09-2020',
  label: 'September 2020 release',
  breadcrumbs: ['Game', 'Changelog'],
})

SEARCH_INDEX.push({
  path: '/changelog/10-2020',
  label: 'October 2020 release',
  breadcrumbs: ['Game', 'Changelog'],
})

SEARCH_INDEX.push({
  path: '/changelog/3rd-anniversary',
  label: 'Third Anniversary release',
  breadcrumbs: ['Game', 'Changelog'],
})

SEARCH_INDEX.push({
  path: '/tournaments/hall-of-fame',
  label: 'Tournaments',
  breadcrumbs: ['Community', 'Tournament Hall of Fame'],
})

SEARCH_INDEX.push({
  path: '/tournaments/odd-even',
  label: 'Odd & Even Tournament',
  breadcrumbs: ['Community', 'Odd & Even Tournament'],
})

SEARCH_INDEX.push({
  path: '/income-calculator',
  label: 'Income Calculator',
  breadcrumbs: ['Tools', 'Income Calculator'],
})

SEARCH_INDEX.push({
  path: '/list/ranked',
  label: 'Ranked Tier List',
  breadcrumbs: ['Game', 'Ranked Tier List'],
})
SEARCH_INDEX.push({
  path: '/list/equals',
  label: 'Equals Tier List',
  breadcrumbs: ['Game', 'Equals Tier List'],
})

// Add all individual brawl pages to the index.
BRAWLS.forEach(brawl => {
  SEARCH_INDEX.push({
    path: '/brawl/' + brawl.id.toLowerCase().replace(/_/g, '-'),
    label: brawl.label,
    breadcrumbs: ['Tools', 'Brawl Tracker'],
  })
})

SEARCH_INDEX.push({
  path: '/collection',
  label: 'Collection',
  breadcrumbs: ['Tools', 'Card Collection'],
})

SEARCH_INDEX.push({
  path: '/collection/books',
  label: 'Books Drawing Calculator',
  breadcrumbs: ['Tools', 'Books Calculator'],
})

SEARCH_INDEX.push({
  path: '/collection/stats',
  label: 'Collection Statistics',
  breadcrumbs: ['Tools', 'Collection Stats'],
})

SEARCH_INDEX.push({
  path: '/deck/suggestions',
  label: 'Popular Decks',
  breadcrumbs: ['Community', 'Popular Decks'],
})

SEARCH_INDEX.push({
  path: '/deck',
  label: 'Deck Builder',
  breadcrumbs: ['Tools', 'Deck Builder', 'Editor'],
})

SEARCH_INDEX.push({
  path: '/deck/collection',
  label: 'Your Personal Decks',
  breadcrumbs: ['Tools', 'Personal Decks'],
})

SEARCH_INDEX.push({
  path: '/quest',
  label: 'Quest Builder',
  breadcrumbs: ['Tools', 'Quest Builder'],
})

SEARCH_INDEX.push({
  path: '/donate',
  label: 'Donate',
  breadcrumbs: ['Community', 'Donate'],
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
    breadcrumbs: ['Community', 'Member'],
  })
})

SEARCH_INDEX.push({
  path: '/brewed-sages',
  label: 'Brewed Sages Podcast',
  breadcrumbs: ['Community', 'Podcast'],
})

SEARCH_INDEX.push({
  path: '/fan-art',
  label: 'Fan Art',
  breadcrumbs: ['Community', 'Fan Art'],
})

export default new FuzzySearch(SEARCH_INDEX, ['label'], {
  caseSensitive: false,
  sort: true,
})
