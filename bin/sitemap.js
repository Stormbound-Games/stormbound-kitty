const fs = require('fs')
const { SitemapStream, streamToPromise } = require('sitemap')
const { BRAWLS } = require('../src/constants/brawl')
const { STORY_CATEGORIES } = require('../src/constants/stories')
const swcc = require('../src/data/swcc')
const cards = require('../src/data/cards')
const guides = require('../src/data/guides')
const puzzles = require('../src/data/puzzles')
const releases = require('../src/data/releases')
const stories = require('../public/stories')

const links = [
  '/',
  '/about',
  '/brawl',
  '/brawl/overview',
  '/calculators/books',
  '/calculators/brawl',
  '/calculators/income',
  '/calculators/value',
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
