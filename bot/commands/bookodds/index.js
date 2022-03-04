import { RARITIES } from '~/constants/game'
import getDrawingExpectations from '~/helpers/getDrawingExpectations'
import getDrawingProbability from '~/helpers/getDrawingProbability'
import searchCards from '~/helpers/searchCards'
import indexArray from '~/helpers/indexArray'
import getEmbed from '~/helpers/getEmbed'
import getCards from '~/api/cards/getCards'
import getBooks from '~/api/books/getBooks'

const getEmbedFields = (cards, book) => {
  const fields = []

  Object.keys(RARITIES).forEach(rarity => {
    const anyKey = 'ANY_' + rarity.toUpperCase()
    const specificKey = 'SPECIFIC_' + rarity.toUpperCase()
    const anyOdds = getDrawingExpectations(anyKey).getExpectations(
      cards,
      book.only
    )
    const specificOdds = getDrawingExpectations(specificKey).getExpectations(
      cards,
      book.only
    )

    fields.push({
      name: `Any ${rarity} card`,
      value:
        (getDrawingProbability(cards, book, anyOdds) * 100).toFixed(2) + '%',
      inline: true,
    })

    fields.push({
      name: `Specific ${rarity} card`,
      value:
        (getDrawingProbability(cards, book, specificOdds) * 100).toFixed(2) +
        '%',
      inline: true,
    })
  })

  fields.push({
    name: 'Fusion stones',
    value: '~10%',
    inline: true,
  })

  return fields
}

const parseMessage = (booksIndex, cards, search) => {
  const terms = search.split(/\s+/g)
  const params = {}

  terms.forEach(term => {
    if (term.toUpperCase() in booksIndex) {
      params.book = booksIndex[term.toUpperCase()]
    } else if (Object.keys(RARITIES).includes(term.toLowerCase())) {
      params.target = term.toUpperCase()
    } else if (term.toLowerCase() === 'fs' || term.toLowerCase() === 'fusion') {
      params.target = 'FUSION_STONES'
    } else if (!params.target) {
      const [card] = searchCards(cards, term)
      params.target = card
    }
  })

  return params
}

const bookodds = {
  command: 'bookodds',
  label: '📕  Book Drawing Odds',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/calculators/books')
      .setDescription(
        `Get the odds of drawing a certain card or Fusion stones from a certain book. It expects a mandatory book name, and an optional expectation such as “fs” or a rarity (both regardless of casing). For instance, \`!${this.command} mythic\`, \`!${this.command} noble epic\`, \`!${this.command} fs\`, \`!${this.command} legendary heroic\`.`
      )
  },
  handler: async function (message) {
    const books = await getBooks()
    const cards = await getCards()
    const booksIndex = indexArray(books)

    const { book, target } = parseMessage(booksIndex, cards, message)

    // The book argument should be mandatory and there is no way to compute
    // anything if it’s not provided.
    if (!book) return

    const embed = getEmbed()
      .setTitle(`${this.label}: ${book.name}`)
      .setURL('https://stormbound-kitty.com/calculators/books')
    const intro = `A **${book.name}** has:`

    if (target === 'FUSION_STONES') {
      embed.setTitle(embed.title + ' · Fusion stones')
      embed.setDescription(
        intro.slice(0, -1) + ` ~10% chance of drawing **Fusion stones**`
      )

      return embed
    }

    // If no specific target is provided, return all the odds for the given book
    // starting with fusion stones, and then going through rarities.
    if (!target) {
      embed.addFields(...getEmbedFields(cards, book))

      return embed
    }

    // If the target happens to be a card, compute the odds to draw a specific
    // card of the card’s rarity, and provide a custom answer.
    if (target.id) {
      const rarity = target.rarity.toUpperCase()
      const odds =
        getDrawingProbability(
          cards,
          book,
          getDrawingExpectations('SPECIFIC_' + rarity).getExpectations(
            cards,
            book.only
          )
        ) * 100

      embed.setTitle(embed.title + ' · ' + target.name)
      embed.setDescription(
        `${intro.slice(0, -1)} ${odds.toFixed(2)}% chance of drawing **${
          target.name
        }**.`
      )

      return embed
    }

    embed.addFields(...getEmbedFields(cards, book))

    return embed
  },
}

export default bookodds
