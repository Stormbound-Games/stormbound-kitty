import parseDate from '#helpers/parseDate'
import toSentence from '#helpers/toSentence'
import groupBy from '#helpers/groupBy'
import getDecks from '#api/decks/getDecks'
import { formatDate } from '#helpers/formatDate'

const now = new Date()
const BOUNDARY_DATE = new Date(now.getFullYear() - 1, now.getMonth(), 15)

getDecks().then(decks => {
  const groups = groupBy(
    decks.filter(deck => parseDate(deck.date) < BOUNDARY_DATE),
    'author.name'
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
            deck.tags.map(tag => tag.name),
            'and'
          )}): https://stormbound-kitty.com/deck/${deck.id}`
        )
      })
      console.log('')
      console.log('Thank you for your help! ✨')
      console.log('')
      console.log('')
    })
})
