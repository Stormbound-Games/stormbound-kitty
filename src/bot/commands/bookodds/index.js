import { RARITIES, BOOKS, PRE_MADE_EXPECTATIONS } from '../../../constants/game'
import capitalise from '../../../helpers/capitalise'
import getDrawingProbability from '../../../helpers/getDrawingProbability'
import getCardsForSearch from '../../../helpers/getCardsForSearch'

const getRarityOdds = book => rarity => {
  const anyKey = 'ANY_' + rarity.toUpperCase()
  const specificKey = 'SPECIFIC_' + rarity.toUpperCase()
  const anyLabel = PRE_MADE_EXPECTATIONS[anyKey].label
  const anyOdds =
    getDrawingProbability(book, PRE_MADE_EXPECTATIONS[anyKey].expectations) *
    100
  const specificLabel = PRE_MADE_EXPECTATIONS[specificKey].label
  const specificOdds =
    getDrawingProbability(
      book,
      PRE_MADE_EXPECTATIONS[specificKey].expectations
    ) * 100

  return `${anyOdds.toFixed(
    2
  )}% chances to draw **${anyLabel}**, ${specificOdds.toFixed(
    2
  )}% chances to draw **${specificLabel}**`
}

const parseSearch = search => {
  let book = null
  let target = null

  search.split(/\s+/g).forEach(term => {
    if (Object.keys(BOOKS).includes(term.toUpperCase())) {
      book = term.toUpperCase()
    } else if (Object.keys(RARITIES).includes(term.toLowerCase())) {
      target = term.toUpperCase()
    } else if (term.toLowerCase() === 'fs' || term.toLowerCase() === 'fusion') {
      target = 'FUSION_STONES'
    } else if (!target) {
      const [card] = getCardsForSearch(term)
      target = card
    }
  })
  return { book, target }
}

export default {
  command: 'bookodds',
  name: 'Book Drawing Odds',
  description:
    'Get the odds of a drawing a certain card of Fusion stones from a certain book',
  example: 'mythic rof',
  icon: '📕',
  handler: function (search) {
    const { book, target } = parseSearch(search)

    // The book argument should be mandatory and there is no way to compute
    // anything if it’s not provided.
    if (!book) return

    const bookName = capitalise(book.toLowerCase())
    const intro = `A **${bookName} book** has:`
    const fsOdds =
      getDrawingProbability(
        book,
        PRE_MADE_EXPECTATIONS.FUSION_STONES.expectations
      ) * 100
    const fsLine = `- ${fsOdds.toFixed(2)}% chances to draw **Fusion stones**`

    if (target === 'FUSION_STONES') {
      return `${intro.slice(0, -1)}${fsLine.slice(1)}.`
    }

    // If no specific target is provided, return all the odds for the given book
    // starting with fusion stones, and then going through rarities.
    if (!target) {
      return (
        [
          intro,
          fsLine,
          ...Object.keys(RARITIES)
            .map(getRarityOdds(book))
            .map(line => '- ' + line),
        ].join('\n') + '.'
      )
    }

    // If the target happes to be a card, compute the odds to draw a specific
    // card of the card’s rarity, and provide a custom answer.
    if (target.id) {
      const odds =
        getDrawingProbability(
          book,
          PRE_MADE_EXPECTATIONS['SPECIFIC_' + target.rarity.toUpperCase()]
            .expectations
        ) * 100
      return `${intro.slice(0, -1)} ${odds.toFixed(2)}% chances to draw **${
        target.name
      }**.`
    }

    return `${intro.slice(0, -1)} ${getRarityOdds(book)(target)}.`
  },
}
