const fs = require('fs')
const puppeteer = require('puppeteer')
const { reduce } = require('asyncro')
const CARDS = require('./src/data/cards')

const WIKI_URL = 'https://stormboundkingdomwars.gamepedia.com/'

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const cards = CARDS.filter(card => !card.token)
  const data = await reduce(
    cards,
    async (acc, card) => {
      console.log('Fetching changelog for', card.name)

      const slug = card.name
        .replace(/\s/g, '_')
        .replace(/’/g, "'")
        .replace(/'/g, '%27')
      const url = WIKI_URL + slug

      console.log('Opening', url)
      await page.goto(url)

      console.log('Retrieving changes')
      const entries = (
        await page.evaluate(() => {
          const titleInner = document.querySelector('#Change_History')
          const title = titleInner.closest('h2')
          const list = title.nextElementSibling
          const items = list.children

          return Array.from(items).map(item => {
            try {
              const [date, rest] = item.innerText.split(':')
              const type = rest.includes('Added') ? 'ADDITION' : 'UPDATE'
              const description = rest.replace(/:\s+/g, '').trim()

              return { date: Date.parse(date), type, description }
            } catch (error) {
              console.log(error)
              return {}
            }
          })
        })
      ).map(entry => {
        entry.id = card.id

        return entry
      })

      console.log('')
      return [...acc, ...entries]
    },
    []
  )

  console.log(data)
  fs.writeFileSync(
    './src/data/changelog.json',
    JSON.stringify(data, null, 2),
    'utf8'
  )

  await browser.close()
})()
