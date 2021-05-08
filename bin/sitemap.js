import fs from 'fs'
import { SitemapStream, streamToPromise } from 'sitemap'
import { BRAWLS } from '../src/constants/brawl'
import { STORY_CATEGORIES } from '../src/constants/stories'
import swcc from '../src/data/swcc'
import cards from '../src/data/cards'
import guides from '../src/data/guides'
import puzzles from '../src/data/puzzles'
import releases from '../src/data/releases'
import stories from '../public/stories'

const links = [
  '/',
  '/about',
  '/brawl',
  '/brawl/overview',
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
  '/fan-kit/cards',
  '/fan-kit/books',
  '/fan-kit/wallpapers',
  '/faq',
  '/list',
  '/list/equals',
  '/list/ranked',
  '/members',
  '/quest',
  '/releases',
  '/sim',
  '/sim/puzzles',
  '/stories',
  '/trivia',
  '/videos',
]

BRAWLS.forEach(brawl => {
  links.push('/brawl/' + brawl.id.replace(/_/g, '-').toLowerCase())
})
cards.forEach(card => {
  links.push('/card/' + card.id + '/display')
})
guides.forEach(guide => {
  links.push('/guides/' + guide.slug)
})
releases.forEach(release => {
  links.push('/releases/' + release.slug)
})
swcc
  .flat()
  .filter(contest => !!contest.winner)
  .forEach(contest => {
    links.push('/card/' + contest.winner.id + '/display')
  })
stories.forEach(story => {
  links.push('/stories/' + story.id)
})
Object.keys(STORY_CATEGORIES).forEach(category => {
  links.push('/stories/' + category)
})
puzzles.forEach(puzzle => {
  links.push('/sim/' + puzzle.board + '/display')
})

const stream = new SitemapStream({ hostname: 'https://stormbound-kitty.com' })

links
  .map(path => ({
    url: path,
    changefreq: 'weekly',
  }))
  .forEach(link => stream.write(link))

stream.end()

streamToPromise(stream).then(data => {
  console.log(`Sitemap successfully generated (${links.length} URLs).`)
  fs.writeFileSync('public/sitemap.xml', data.toString(), 'utf8')
})
