const fs = require('fs')
const { SitemapStream, streamToPromise } = require('sitemap')
const { BRAWLS } = require('../src/constants/brawl')
const { STORY_CATEGORIES } = require('../src/constants/stories')
const { SWCC_SEASON_1, SWCC_SEASON_2 } = require('../src/constants/misc')
const cards = require('../src/data/cards')
const guides = require('../src/data/guides')
const puzzles = require('../src/data/puzzles')
const stories = require('../public/stories')

const links = [
  '/',
  '/brawl',
  '/brawl/overview',
  '/card',
  '/card/contest',
  '/card/stats',
  '/changelog/cards',
  '/changelog/releases',
  '/changelog/07-2020',
  '/changelog/09-2020',
  '/collection',
  '/collection/books',
  '/collection/stats',
  '/deck',
  '/deck/collection',
  '/deck/suggestions',
  '/fan-kit/cards',
  '/fan-kit/books',
  // '/fan-kit/wallpapers',
  '/faq',
  '/income-calculator',
  '/list',
  '/list/equals',
  '/list/ranked',
  '/quest',
  '/sim',
  '/sim/puzzles',
  '/stories',
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
;[...SWCC_SEASON_1, ...SWCC_SEASON_2]
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

return streamToPromise(stream).then(data => {
  console.log(`Sitemap successfully generated (${links.length} URLs).`)
  fs.writeFileSync('public/sitemap.xml', data.toString(), 'utf8')
})
