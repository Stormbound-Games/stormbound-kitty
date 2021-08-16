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

export default mode => {
  const contests = SWCC.flat().filter(contest => !!contest.winner)
  const members = getMembersList().map(entry => entry.member)
  const links = [
    '/',
    '/about',
    '/brawl',
    '/brewed-sages',
    '/calculators/books',
    '/calculators/brawl',
    '/calculators/income',
    '/calculators/value',
    '/calculators/hero',
    '/card',
    '/card/contest',
    '/card/stats',
    '/changelog',
    '/collection',
    '/collection/stats',
    '/deck',
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
    '/known-bugs',
    '/lexicon',
    '/list',
    '/list/equals',
    '/list/ranked',
    '/members',
    '/quest',
    '/releases',
    '/sim',
    '/sim/puzzles',
    '/simulators/books',
    '/stories',
    '/tournaments/hall-of-fame',
    '/trivia',
    '/videos',
  ]

  if (mode === 'LIGHT') {
    links.push('/brawl/' + BRAWLS[0].id.replace(/_/g, '-').toLowerCase())
  } else {
    BRAWLS.forEach(brawl => {
      links.push('/brawl/' + brawl.id.replace(/_/g, '-').toLowerCase())
    })
  }

  Object.keys(GUIDE_CATEGORIES).forEach(category => {
    links.push('/guides/' + category.toLowerCase())
  })

  GUIDES.forEach(guide => {
    links.push('/guides/' + guide.slug)
  })

  RELEASES.forEach(release => {
    links.push('/releases/' + release.slug)
  })

  if (mode === 'LIGHT') {
    links.push('/card/' + contests[0].winner.id + '/display')
  } else {
    contests.forEach(contest => {
      links.push('/card/' + contest.winner.id + '/display')
    })
  }

  Object.keys(STORY_CATEGORIES).forEach(category => {
    links.push('/stories/' + category)
  })

  if (mode === 'LIGHT') {
    links.push('/stories/' + STORIES[0].id)
  } else {
    STORIES.forEach(story => {
      links.push('/stories/' + story.id)
    })
  }

  if (mode === 'LIGHT') {
    links.push('/sim/' + PUZZLES[0].board + '/display')
  } else {
    PUZZLES.forEach(puzzle => {
      links.push('/sim/' + puzzle.board + '/display')
    })
  }

  if (mode === 'LIGHT') {
    links.push('/deck/' + DECKS[0].id)
    links.push('/deck/' + DECKS[0].id + '/detail')
    links.push('/deck/' + DECKS[0].id + '/dry-run')
  } else {
    DECKS.forEach(deck => {
      links.push('/deck/' + deck.id)
      links.push('/deck/' + deck.id + '/detail')
      links.push('/deck/' + deck.id + '/dry-run')
    })
  }

  if (mode === 'LIGHT') {
    links.push('/card/' + CARDS[0].id + '/display')
  } else {
    CARDS.forEach(card => {
      links.push('/card/' + card.id + '/display')
    })
  }

  if (mode === 'LIGHT') {
    links.push('/member/' + members[0])
  } else {
    members.forEach(member => {
      links.push('/member/' + member)
    })
  }

  return links
}
