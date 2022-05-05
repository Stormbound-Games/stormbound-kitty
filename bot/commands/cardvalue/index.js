import getEmbed from '~/helpers/getEmbed'
import clamp from '~/helpers/clamp'
import getCardValue from '~/helpers/getCardValue'
import searchCards from '~/helpers/searchCards'
import indexArray from '~/helpers/indexArray'
import getAbbreviations from '~/api/misc/getAbbreviations'
import getCards from '~/api/cards/getCards'

const getLevel = message => {
  message = message.trim()
  const leadingLevel = (message.match(/^(\d)/) || [])[1]
  const trailingLevel = (message.match(/(\d)$/) || [])[1]
  const hasLevel = leadingLevel || trailingLevel
  const level = clamp(+hasLevel, 1, 5)

  message = message.replace(/^(\d)/, '').replace(/(\d)$/, '')

  return [hasLevel ? level : 1, message]
}

const cardvalue = {
  command: 'cardvalue',
  label: '⚖️  Card value',
  aliases: [],
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/calculators/value')
      .setDescription(
        `Get the estimated value of a card for a single turn. It optionally accepts a level. For instance, \`!${this.command} rof\` or \`!${this.command} mia 4\`.`
      )
  },
  handler: async function (message) {
    const cards = await getCards()
    const abbreviations = await getAbbreviations({ casing: 'LOWERCASE', cards })
    const cardsIndex = indexArray(cards)
    const [level, search] = getLevel(message)
    const [card] = searchCards(cards, abbreviations, search)

    if (!card) return

    const value = getCardValue(cardsIndex, card.id, level)
    const embed = getEmbed().setTitle(
      `${this.label}: ${card.name} (level ${level})`
    )

    if (!value) {
      return embed.setDescription(
        `It is not possible to efficiently compute the value of ${card.name}.`
      )
    }

    return embed.addFields(
      { name: 'Min', value: value[0].toFixed(2), inline: true },
      { name: 'Max', value: value[1].toFixed(2), inline: true },
      {
        name: 'Avg',
        value: ((value[0] + value[1]) / 2).toFixed(2),
        inline: true,
      }
    )
  },
}

export default cardvalue
