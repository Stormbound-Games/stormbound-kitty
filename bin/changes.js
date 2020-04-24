const fs = require('fs')
const puppeteer = require('puppeteer')
const { reduce } = require('asyncro')
const cards = require('../src/data/cards')

const CARDS = cards.filter(card => !card.token)
const WIKI_URL = 'https://stormboundkingdomwars.gamepedia.com/'
const slugify = name =>
  name.replace(/\s/g, '_').replace(/’/g, "'").replace(/'/g, '%27')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const data = await reduce(
    CARDS,
    async (acc, card) => {
      console.log('Fetching changelog for', card.name)
      const url = WIKI_URL + slugify(card.name)

      console.log('Opening', url)
      await page.goto(url)

      console.log('Retrieving changes')
      const entries = (
        await page.evaluate(() => {
          const title = document.querySelector('#Change_History').closest('h2')
          const items = Array.from(title.nextElementSibling.children)

          return items.map(item => {
            try {
              const [date, rest] = item.innerText.split(':')
              const type = rest.includes('Added to the game')
                ? 'ADDITION'
                : 'UPDATE'
              const description = rest.replace(/:\s+/g, '').trim()

              return { date: Date.parse(date), type, description }
            } catch (error) {
              console.log(error)
              return {}
            }
          })
        })
      ).map(entry => ({ ...entry, id: card.id }))

      console.log('')
      return [...acc, ...entries]
    },
    []
  )

  console.log(data)
  console.log('Writing data')
  fs.writeFileSync(
    './src/data/changelog.json',
    JSON.stringify(data, null, 2),
    'utf8'
  )

  await browser.close()
})()
