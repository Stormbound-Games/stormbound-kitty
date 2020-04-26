const fs = require('fs')
const puppeteer = require('puppeteer')
const { reduce } = require('asyncro')
const cards = require('../src/data/cards')
const changelog = require('../src/data/changelog')

const CARDS = cards.filter(card => !card.token)
const WIKI_URL = 'https://stormboundkingdomwars.gamepedia.com/'
const slugify = name =>
  name.replace(/\s/g, '_').replace(/’/g, "'").replace(/'/g, '%27')

const getCardData = page => async (acc, card) => {
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
          const subList = item.querySelector('ul')
          if (subList) item.remove()

          const [date, rest] = item.innerText.split(':')
          const type = rest.includes('Added to the game')
            ? 'ADDITION'
            : 'UPDATE'
          const description = rest
            // Remove the leading `: ` left by the date prefix
            .replace(/:\s+/g, '')
            // Remove fullstops for consistency
            .replace(/\.$/, '')
            // Remove Oxford commas for consistency
            .replace(', and', ' and')
            // Fix typo
            .replace('abiltiy', 'ability')
            .trim()

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
}

// Build a cache from the existing changelog to speed up the lookup for existing
// entries (O(N) instead of O(N2)).
const cache = changelog.reduce((acc, change) => {
  acc[change.date + change.id] = change
  return acc
}, {})

const getCardSubjects = () => {
  const arg = process.argv[2] || ''
  const ids = arg.split(',').filter(Boolean)

  if (ids.length === 0) return CARDS

  return ids.map(id => {
    const card = CARDS.find(card => card.id === id)

    if (!card) {
      throw new Error(`Card not found for id: ${id}`)
    }

    return card
  })
}

const SUBJECTS = getCardSubjects()

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const data = await reduce(SUBJECTS, getCardData(page), [])

  console.log('Filtering out existing data')
  const filteredData = data.filter(change => !cache[change.date + change.id])

  if (filteredData.length === 0) {
    console.log('No new data found')
  } else {
    console.log('Writing data')
    fs.writeFileSync(
      './src/data/changelog.json',
      JSON.stringify([...changelog, ...filteredData], null, 2),
      'utf8'
    )
  }

  await browser.close()
})()
