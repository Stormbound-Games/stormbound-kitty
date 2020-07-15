import Discord from 'discord.js'
import getAbbreviations from '../../../helpers/getAbbreviations'
import toSentence from '../../../helpers/toSentence'

const ABBREVIATIONS = getAbbreviations('LOWERCASE')

const quotify = value => `“${value}”`

export default {
  command: 'abbr',
  help: function () {
    const embed = new Discord.MessageEmbed()

    embed
      .setColor('#D7598B')
      .setTitle(`❔  Abbreviation help`)
      .setURL('https://stormbound-kitty.com/guides/lexicon')
      .setDescription(
        `Get the meaning of a card or popular abbreviation (regardless of casing). For instance, \`!${this.command} rof\` or \`!${this.command} AoE\`.`
      )

    return embed
  },
  handler: function (message) {
    const matches = ABBREVIATIONS[message.toLowerCase()]

    if (!matches) return

    const embed = new Discord.MessageEmbed()

    embed
      .setColor('#D7598B')
      .setTitle(`❔  Abbreviation “${message}”`)
      .setURL('https://stormbound-kitty.com/guides/lexicon')
      .setDescription(
        `“${message}” might mean ${toSentence(matches.map(quotify), 'or')}.`
      )

    return embed
  },
}
