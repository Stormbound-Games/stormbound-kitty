import { RARITIES, BOOKS, PRE_MADE_EXPECTATIONS } from '../../../constants/game'
import capitalise from '../../../helpers/capitalise'
import getDrawingProbability from '../../../helpers/getDrawingProbability'
import searchCards from '../../../helpers/searchCards'

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

const parseMessage = search => {
  const terms = search.split(/\s+/g)
  const params = {}

  terms.forEach(term => {
    if (Object.keys(BOOKS).includes(term.toUpperCase())) {
      params.book = term.toUpperCase()
    } else if (Object.keys(RARITIES).includes(term.toLowerCase())) {
      params.target = term.toUpperCase()
    } else if (term.toLowerCase() === 'fs' || term.toLowerCase() === 'fusion') {
      params.target = 'FUSION_STONES'
    } else if (!params.target) {
      const [card] = searchCards(term)
      params.target = card
    }
  })

  return params
}

export default {
  command: 'bookodds',
  help: function () {
    return `📕  **Book Drawing Odds:** Get the odds of drawing a certain card or Fusion stones from a certain book. It expects a mandatory book name, and an optional expectation such as “fs” or a rarity (both regardless of casing). For instance, \`!${this.command} mythic\`, \`!${this.command} noble epic\`, \`!${this.command} fs\`, \`!${this.command} legendary heroic\`.`
  },
  handler: function (message) {
    const { book, target } = parseMessage(message)

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
