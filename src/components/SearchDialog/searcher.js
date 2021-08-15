import Fuse from 'fuse.js'
import CARDS from '../../data/cards'
import DECKS from '../../data/decks'
import GUIDES from '../../data/guides'
import STORIES from '../../data/stories'
import { BRAWLS } from '../../constants/brawl'
import { CATEGORIES } from '../../constants/guides'
import { STORY_CATEGORIES } from '../../constants/stories'

export const SEARCH_INDEX = []

const recordMember = member => {
  const exists = SEARCH_INDEX.find(entry => entry.label === member)
  if (exists) return
  SEARCH_INDEX.push({
    path: `/member/${member}`,
    label: member,
    breadcrumbs: ['Community', 'Members'],
  })
}

CARDS.filter(card => !card.token).forEach(card => {
  SEARCH_INDEX.push({
    path: `/card/${card.id}/display`,
    label: card.name,
    breadcrumbs: ['Tools', 'Card Builder'],
  })
})

SEARCH_INDEX.push({
  path: '/members',
  label: 'Members',
  breadcrumbs: ['Community', 'Discover'],
})

SEARCH_INDEX.push({
  path: '/card',
  label: 'Card Builder',
  breadcrumbs: ['Tools', 'Builders'],
})

SEARCH_INDEX.push({
  path: '/card/stats',
  label: 'Card Statistics',
  breadcrumbs: ['Official'],
})

DECKS.forEach(deck => {
  recordMember(deck.author)
  SEARCH_INDEX.push({
    path: `/deck/${deck.id}/detail`,
    label: `${deck.name} by ${deck.author}`,
    breadcrumbs: ['Tools', 'Deck Builder'],
  })
})

Object.keys(CATEGORIES).forEach(id => {
  SEARCH_INDEX.push({
    path: `/guides/${CATEGORIES[id].slug}`,
    label: CATEGORIES[id].name.long,
    breadcrumbs: ['Guides'],
  })
})

GUIDES.forEach(guide => {
  SEARCH_INDEX.push({
    path: `/guides/${guide.slug}`,
    label: guide.name,
    breadcrumbs: ['Guides', CATEGORIES[guide.category].name.short],
  })

  guide.authors.forEach(recordMember)
})

SEARCH_INDEX.push({
  path: `/sim`,
  label: 'Battle Sim',
  breadcrumbs: ['Tools', 'Builders'],
})

SEARCH_INDEX.push({
  path: '/sim/puzzles',
  label: 'Battle Puzzles',
  breadcrumbs: ['Community', 'Contests'],
})

SEARCH_INDEX.push({
  path: '/trivia',
  label: 'Trivia Game',
  breadcrumbs: ['Community', 'Contests'],
})

SEARCH_INDEX.push({
  path: '/videos',
  label: 'Videos',
  breadcrumbs: ['Community'],
})

SEARCH_INDEX.push({
  path: '/card/contest',
  label: 'Weekly Card Contest',
  breadcrumbs: ['Community', 'Contests'],
})

SEARCH_INDEX.push({
  path: `/simulators/books`,
  label: 'Book Simulator',
  breadcrumbs: ['Tools', 'Builders'],
})

SEARCH_INDEX.push({
  path: '/faq',
  label: 'Frequently Asked Questions',
  breadcrumbs: ['Home'],
})

SEARCH_INDEX.push({
  path: '/fan-kit',
  label: 'Fan-Kit',
  breadcrumbs: ['Official'],
})

SEARCH_INDEX.push({
  path: '/changelog',
  label: 'Card Changelog',
  breadcrumbs: ['Official', 'Updates'],
})

SEARCH_INDEX.push({
  path: '/releases',
  label: 'Releases Notes',
  breadcrumbs: ['Official', 'Updates'],
})

SEARCH_INDEX.push({
  path: '/tournaments/hall-of-fame',
  label: 'Tournaments',
  breadcrumbs: ['Community', 'Contests'],
})

SEARCH_INDEX.push({
  path: '/calculators/income',
  label: 'Income Calculator',
  breadcrumbs: ['Tools', 'Calculators'],
})

SEARCH_INDEX.push({
  path: '/calculators/value',
  label: 'Value Calculator',
  breadcrumbs: ['Tools', 'Calculators'],
})

SEARCH_INDEX.push({
  path: '/calculators/books',
  label: 'Books Calculator',
  breadcrumbs: ['Tools', 'Calculators'],
})

SEARCH_INDEX.push({
  path: '/calculators/brawl',
  label: 'Brawl Calculator',
  breadcrumbs: ['Tools', 'Calculators'],
})

SEARCH_INDEX.push({
  path: '/calculators/hero',
  label: 'Hero Score Calculator',
  breadcrumbs: ['Tools', 'Calculators'],
})

SEARCH_INDEX.push({
  path: '/list/ranked',
  label: 'Ranked Tier List',
  breadcrumbs: ['Community', 'Meta'],
})

SEARCH_INDEX.push({
  path: '/list/equals',
  label: 'Equals Tier List',
  breadcrumbs: ['Community', 'Meta'],
})

// Add all individual brawl pages to the index.
BRAWLS.forEach(brawl => {
  SEARCH_INDEX.push({
    path: '/brawl/' + brawl.id.toLowerCase().replace(/_/g, '-'),
    label: brawl.label,
    breadcrumbs: ['Tools', 'Your content'],
  })
})

SEARCH_INDEX.push({
  path: '/brawl',
  label: 'Brawl Tracker',
  breadcrumbs: ['Tools', 'Your Content'],
})

SEARCH_INDEX.push({
  path: '/collection',
  label: 'Collection',
  breadcrumbs: ['Tools', 'Your Content'],
})

SEARCH_INDEX.push({
  path: '/collection/stats',
  label: 'Collection Statistics',
  breadcrumbs: ['Tools', 'Your Content'],
})

SEARCH_INDEX.push({
  path: '/deck/suggestions',
  label: 'Popular Decks',
  breadcrumbs: ['Community', 'Meta'],
})

SEARCH_INDEX.push({
  path: '/deck',
  label: 'Deck Builder',
  breadcrumbs: ['Tools', 'Builders'],
})

SEARCH_INDEX.push({
  path: '/deck/collection',
  label: 'Your Personal Decks',
  breadcrumbs: ['Tools', 'Your Content'],
})

SEARCH_INDEX.push({
  path: '/quest',
  label: 'Quest Builder',
  breadcrumbs: ['Tools', 'Builders'],
})

SEARCH_INDEX.push({
  path: '/about',
  label: 'About',
  breadcrumbs: ['Home'],
})

SEARCH_INDEX.push({
  path: '/stories',
  label: 'Stories',
  breadcrumbs: ['Stories'],
})

Object.keys(STORY_CATEGORIES).forEach(id => {
  SEARCH_INDEX.push({
    path: `/stories/${id}`,
    label: STORY_CATEGORIES[id].title,
    breadcrumbs: ['Stories'],
  })
})

STORIES.forEach(story => {
  SEARCH_INDEX.push({
    path: `/stories/${story.id}`,
    label: story.title,
    breadcrumbs: ['Stories'],
  })
  recordMember(story.author)
})

SEARCH_INDEX.push({
  path: '/brewed-sages',
  label: 'Brewed Sages Podcast',
  breadcrumbs: ['Community', 'Discover'],
})

SEARCH_INDEX.push({
  path: '/fan-art',
  label: 'Fan Art',
  breadcrumbs: ['Community', 'Miscellaneous'],
})

export default new Fuse(SEARCH_INDEX, { keys: ['label'] })
