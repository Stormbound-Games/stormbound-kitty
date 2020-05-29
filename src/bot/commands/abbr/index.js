import getRawCardData from '../../../helpers/getRawCardData'
import getCardAbbreviations from '../../../helpers/getCardAbbreviations'
import { COMMON_ABBREVIATIONS } from '../../../constants/misc'

const CARD_ABBREVIATIONS = getCardAbbreviations()
const ABBREVIATIONS = Object.keys(COMMON_ABBREVIATIONS).reduce(
  (acc, key) => ({
    ...acc,
    [key.toLowerCase()]: COMMON_ABBREVIATIONS[key],
  }),
  {}
)

const quotify = value => `“${value}”`
const sentencify = array => {
  if (array.length < 2) return array.join('')
  return array.slice(0, array.length - 1).join(', ') + ', or ' + array.slice(-1)
}

export default search => {
  const commonMatch = ABBREVIATIONS[search.toLowerCase()]
  const cardMatch = CARD_ABBREVIATIONS[search.toLowerCase()]
  const matches = [
    commonMatch,
    cardMatch && getRawCardData(cardMatch).name,
  ].filter(Boolean)

  if (matches.length > 0) {
    return `“${search}” might mean ${sentencify(matches.map(quotify))}.`
  }
}
