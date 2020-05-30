import getAbbreviations from '../../../helpers/getAbbreviations'

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
  handler: function (message) {
    const matches = ABBREVIATIONS[message.toLowerCase()]

    if (matches) {
      return `“${message}” might mean ${sentencify(matches.map(quotify))}.`
    }
  },
}
