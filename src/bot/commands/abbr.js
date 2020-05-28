import getRawCardData from '../../helpers/getRawCardData'
import getCardAbbreviations from '../../helpers/getCardAbbreviations'
import { COMMON_ABBREVIATIONS } from '../../constants/misc'

const CARD_ABBREVIATIONS = getCardAbbreviations()

export default content => {
  const search = content.replace('!abbr', '').trim().toLowerCase()
  const result = CARD_ABBREVIATIONS[search]

  if (COMMON_ABBREVIATIONS[search]) {
    return `“${search}” might mean “${COMMON_ABBREVIATIONS[search]}”.`
  }

  if (result) {
    const card = getRawCardData(result)

    return [
      `“${search}” might mean “${card.name}”.`,
      'https://stormbound-kitty.com/card/' + getRawCardData(result).id,
    ].join('\n')
  }
}
