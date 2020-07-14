import getAbbreviations from '../../../helpers/getAbbreviations'
import toSentence from '../../../helpers/toSentence'

const ABBREVIATIONS = getAbbreviations('LOWERCASE')

const quotify = value => `“${value}”`

export default {
  command: 'abbr',
  help: function () {
    return `❔  **Abbreviations:** Get the meaning of a card or popular abbreviation (regardless of casing). For instance, \`!${this.command} rof\` or \`!${this.command} AoE\`.`
  },
  handler: function (message) {
    const matches = ABBREVIATIONS[message.toLowerCase()]

    if (matches) {
      return `“${message}” might mean ${toSentence(
        matches.map(quotify),
        'or'
      )}.`
    }
  },
}
