require('module-alias').addAlias('~', __dirname + '/../src')

const fs = require('fs')
const { SitemapStream, streamToPromise } = require('sitemap')
const getSitemap = require('~/helpers/getSitemap').default

const links = getSitemap('FULL')

const stream = new SitemapStream({ hostname: 'https://stormbound-kitty.com' })

links
  .map(path => ({ url: path, changefreq: 'weekly' }))
  .forEach(link => stream.write(link))

stream.end()

streamToPromise(stream).then(data => {
  console.log(`Sitemap successfully generated (${links.length} URLs).`)
  fs.writeFileSync('public/sitemap.xml', data.toString(), 'utf8')
})
