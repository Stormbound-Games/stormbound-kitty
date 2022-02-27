import getAbbreviations from '~/helpers/getAbbreviations'
import toSentence from '~/helpers/toSentence'
import getEmbed from '~/helpers/getEmbed'
import getCards from '~/api/cards/getCards'

const quotify = value => `“${value}”`

const abbr = {
  command: 'abbr',
  label: '❔  Abbreviation',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/lexicon')
      .setDescription(
        `Get the meaning of a card or popular abbreviation (regardless of casing). For instance, \`!${this.command} rof\` or \`!${this.command} AoE\`.`
      )
  },
  handler: async function (message) {
    const cards = await getCards()
    const abbreviations = getAbbreviations(cards, 'LOWERCASE')
    const matches = abbreviations[message.toLowerCase()]

    if (!matches) return

    const embed = getEmbed()

    embed
      .setTitle(`${this.label}: “${message}”`)
      .setURL('https://stormbound-kitty.com/lexicon')
      .setDescription(
        `“${message}” might mean ${toSentence(matches.map(quotify), 'or')}.`
      )

    return embed
  },
}

export default abbr
