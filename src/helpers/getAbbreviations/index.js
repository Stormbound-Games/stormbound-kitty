import cards from '../../data/cards'
import abbreviate from '../abbreviate'
import { COMMON_ABBREVIATIONS } from '../../constants/misc'

export default (casing = 'NATURAL') => {
  const abbreviations = {}

  cards.forEach(card => {
    const abbreviatedName = abbreviate(card.name)

    if (abbreviatedName.length === 1) return

    const key =
      casing === 'NATURAL' ? abbreviatedName : abbreviatedName.toLowerCase()

    if (typeof abbreviations[key] === 'undefined') {
      abbreviations[key] = []
    }

    abbreviations[key].push(card.name)
  })

  for (const abbreviation in COMMON_ABBREVIATIONS) {
    const key = casing === 'NATURAL' ? abbreviation : abbreviation.toLowerCase()

    if (typeof abbreviations[key] === 'undefined') {
      abbreviations[key] = []
    }

    abbreviations[key].push(COMMON_ABBREVIATIONS[abbreviation])
  }

  return abbreviations
}
