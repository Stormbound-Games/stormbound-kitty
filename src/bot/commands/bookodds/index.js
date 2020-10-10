import { RARITIES, BOOKS, PRE_MADE_EXPECTATIONS } from '../../../constants/game'
import capitalise from '../../../helpers/capitalise'
import getDrawingProbability from '../../../helpers/getDrawingProbability'
import searchCards from '../../../helpers/searchCards'
import getEmbed from '../../../helpers/getEmbed'

const getEmbedFields = book => {
  const stoneOdds = PRE_MADE_EXPECTATIONS.FUSION_STONES.expectations
  const fields = []

  Object.keys(RARITIES).forEach((rarity, index) => {
    const anyKey = 'ANY_' + rarity.toUpperCase()
    const specificKey = 'SPECIFIC_' + rarity.toUpperCase()
    const anyOdds = PRE_MADE_EXPECTATIONS[anyKey].expectations
    const specificOdds = PRE_MADE_EXPECTATIONS[specificKey].expectations

    fields.push({
      name: `Any ${rarity} card`,
      value: (getDrawingProbability(book, anyOdds) * 100).toFixed(2) + '%',
      inline: true,
    })

    fields.push({
      name: `Specific ${rarity} card`,
      value: (getDrawingProbability(book, specificOdds) * 100).toFixed(2) + '%',
      inline: true,
    })
  })

  fields.push({
    name: `Fusion stones`,
    value: (getDrawingProbability(book, stoneOdds) * 100).toFixed(2) + '%',
    inline: true,
  })

  return fields
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
  label: '📕  Book Drawing Odds',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/calculators/books')
      .setDescription(
        `Get the odds of drawing a certain card or Fusion stones from a certain book. It expects a mandatory book name, and an optional expectation such as “fs” or a rarity (both regardless of casing). For instance, \`!${this.command} mythic\`, \`!${this.command} noble epic\`, \`!${this.command} fs\`, \`!${this.command} legendary heroic\`.`
      )
  },
  handler: function (message) {
    const { book, target } = parseMessage(message)

    // The book argument should be mandatory and there is no way to compute
    // anything if it’s not provided.
    if (!book) return

    const bookName = capitalise(book.toLowerCase())
    const embed = getEmbed()
      .setTitle(`${this.label}: ${bookName}`)
      .setURL('https://stormbound-kitty.com/calculators/books')

    const intro = `A **${bookName} book** has:`
    const fsOdds =
      getDrawingProbability(
        book,
        PRE_MADE_EXPECTATIONS.FUSION_STONES.expectations
      ) * 100
    const fsLine = `- ${fsOdds.toFixed(2)}% chances to draw **Fusion stones**`

    if (target === 'FUSION_STONES') {
      embed.setTitle(embed.title + ' · Fusion stones')
      embed.setDescription(`${intro.slice(0, -1)}${fsLine.slice(1)}.`)

      return embed
    }

    // If no specific target is provided, return all the odds for the given book
    // starting with fusion stones, and then going through rarities.
    if (!target) {
      embed.addFields(...getEmbedFields(book))

      return embed
    }

    // If the target happens to be a card, compute the odds to draw a specific
    // card of the card’s rarity, and provide a custom answer.
    if (target.id) {
      const odds =
        getDrawingProbability(
          book,
          PRE_MADE_EXPECTATIONS['SPECIFIC_' + target.rarity.toUpperCase()]
            .expectations
        ) * 100

      embed.setTitle(embed.title + ' · ' + target.name)
      embed.setDescription(
        `${intro.slice(0, -1)} ${odds.toFixed(2)}% chances to draw **${
          target.name
        }**.`
      )

      return embed
    }

    embed.addFields(...getEmbedFields(book))

    return embed
  },
}
