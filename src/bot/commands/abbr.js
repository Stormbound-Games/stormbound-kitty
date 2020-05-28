import getRawCardData from '../../helpers/getRawCardData'
import getCardAbbreviations from '../../helpers/getCardAbbreviations'
import { COMMON_ABBREVIATIONS } from '../../constants/misc'

const CARD_ABBREVIATIONS = getCardAbbreviations()

export default search => {
  const commonMatch = COMMON_ABBREVIATIONS[search.toLowerCase()]
  const cardMatch = CARD_ABBREVIATIONS[search.toLowerCase()]
  const suggest = suggestion => `“${search}” might mean “${suggestion}”.`

  if (commonMatch) return suggest(commonMatch)
  if (cardMatch) return suggest(getRawCardData(cardMatch).name)
}
