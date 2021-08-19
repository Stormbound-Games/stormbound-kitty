import { BRAWLS } from '~/constants/brawl'
import { STORY_CATEGORIES } from '~/constants/stories'
import { CATEGORIES as GUIDE_CATEGORIES } from '~/constants/guides'
import DECKS from '~/data/decks'
import SWCC from '~/data/swcc'
import CARDS from '~/data/cards'
import GUIDES from '~/data/guides'
import PUZZLES from '~/data/puzzles'
import RELEASES from '~/data/releases'
import STORIES from '~/data/stories'
import getMembersList from '~/helpers/getMembersList'

const getSitemap = () => {
  const contests = SWCC.flat().filter(contest => !!contest.winner)
  const members = getMembersList().map(entry => entry.member)
  const links = [
    '/',
    '/about',
    '/brawl',
    '/brawl/' + BRAWLS[0].id.replace(/_/g, '-').toLowerCase(),
    '/brewed-sages',
    '/calculators/books',
    '/calculators/brawl',
    '/calculators/income',
    '/calculators/value',
    '/calculators/hero',
    '/card',
    '/card/' + CARDS[0].id + '/display',
    '/card/' + contests[0].winner.id + '/display',
    '/card/contest',
    '/card/stats',
    '/changelog',
    '/collection',
    '/collection/stats',
    '/deck',
    '/deck/' + DECKS[0].id + '/detail',
    '/deck/' + DECKS[0].id + '/dry-run',
    '/deck/' + DECKS[0].id,
    '/deck/collection',
    '/deck/suggestions',
    '/fan-art',
    '/fan-kit',
    '/fan-kit/avatars',
    '/fan-kit/backgrounds',
    '/fan-kit/books',
    '/fan-kit/cards',
    '/fan-kit/wallpapers',
    '/faq',
    ...Object.keys(GUIDE_CATEGORIES).map(
      category => '/guides/' + GUIDE_CATEGORIES[category].slug
    ),
    ...GUIDES.map(guide => '/guides/' + guide.slug),
    '/known-bugs',
    '/lexicon',
    '/list',
    '/list/equals',
    '/list/ranked',
    '/members',
    '/members/' + members[0],
    '/quest',
    '/releases',
    ...RELEASES.map(release => '/releases/' + release.slug),
    '/sim',
    '/sim/' + PUZZLES[0].board + '/display',
    '/sim/puzzles',
    '/simulators/books',
    '/stories',
    ...Object.keys(STORY_CATEGORIES).map(category => '/stories/' + category),
    '/stories/' + STORIES[0].id,
    '/tournaments/hall-of-fame',
    '/trivia',
    '/videos',
  ]

  return links
}

describe('Routes', () => {
  const links = getSitemap()

  links.forEach(link => {
    it(link, () => cy.visit(link).get('h1').should('exist'))
  })
})
