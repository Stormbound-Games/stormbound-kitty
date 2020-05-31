import getAbbreviations from '../../../helpers/getAbbreviations'
import { TRIVIA_CHANNEL } from '../../../constants/bot'

const ABBREVIATIONS = getAbbreviations('LOWERCASE')

const quotify = value => `“${value}”`
const sentencify = array => {
  if (array.length < 2) return array.join('')
  return array.slice(0, array.length - 1).join(', ') + ', or ' + array.slice(-1)
}

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
      return `“${message}” might mean ${sentencify(matches.map(quotify))}.`
    }
  },
}
