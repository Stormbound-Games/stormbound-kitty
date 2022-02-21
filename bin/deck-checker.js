require('module-alias/register')

const decks = require('~/data/decks')
const { TAGS } = require('~/constants/deck')
const parseDate = require('~/helpers/parseDate').default
const toSentence = require('~/helpers/toSentence').default
const { formatDate } = require('~/helpers/formatDate')

const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})

const BOUNDARY_DATE = new Date(2021, 4, 15)

const groups = groupBy(
  decks.filter(deck => parseDate(deck.date) < BOUNDARY_DATE),
  'author'
)

Object.keys(groups)
  .slice(0, Infinity)
  .forEach(author => {
    const decks = groups[author]
    const single = decks.length === 1

    console.log('')
    console.log('')
    console.log(`Hey ${author}! 👋`)
    console.log('')
    console.log(
      `There ${single ? 'is' : 'are'} ${decks.length} deck${
        single ? '' : 's'
      } from you on the site and I would like to make sure ${
        single ? 'it is' : 'they are'
      } still somewhat relevant. I would love if you could have a look and let me know if I should remove or update anything. :)`
    )
    decks.forEach(deck => {
      const date = formatDate(parseDate(deck.date))

      console.log(
        `- ${deck.name} (added in ${date}, tagged with ${toSentence(
          deck.tags.map(tag => TAGS[tag]),
          'and'
        )}): https://stormbound-kitty.com/deck/${deck.id}`
      )
    })
    console.log('')
    console.log('Thank you for your help! ✨')
    console.log('')
    console.log('')
  })
