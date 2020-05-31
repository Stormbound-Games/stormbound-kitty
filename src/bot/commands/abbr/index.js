import getAbbreviations from '../../../helpers/getAbbreviations'
import { TRIVIA_CHANNEL } from '../../../constants/bot'
import toSentence from '../../../helpers/toSentence'

const ABBREVIATIONS = getAbbreviations('LOWERCASE')

const quotify = value => `“${value}”`

export default {
  command: 'abbr',
  name: 'Abbreviations',
  example: 'AoE',
  description: 'Get the meaning of a card or popular abbreviation',
  icon: '❔',
  isAllowed: channel => channel.id !== TRIVIA_CHANNEL,
  handler: function (message) {
    const matches = ABBREVIATIONS[message.toLowerCase()]

    if (matches) {
      return `“${message}” might mean ${toSentence(matches.map(quotify))}.`
    }
  },
}
