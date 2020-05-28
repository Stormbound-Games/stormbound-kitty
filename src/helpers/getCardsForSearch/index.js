import FuzzySearch from 'fuzzy-search'
import cards from '../../data/cards'
import getRawCardData from '../getRawCardData'
import getCardAbbreviations from '../getCardAbbreviations'

const SEARCH_OPTIONS = { caseSensitive: false, sort: true }

export const searcher = new FuzzySearch(
  cards.filter(card => !card.token),
  ['name'],
  SEARCH_OPTIONS
)

const CARD_ABBREVIATIONS = getCardAbbreviations()

export default search => {
  if (search.length === 0) return []

  const cardFromID = getRawCardData(search.toUpperCase())

  if (cardFromID.id) return [cardFromID]

  const cardFromAbbr = getRawCardData(CARD_ABBREVIATIONS[search.toLowerCase()])

  if (cardFromAbbr.id) return [cardFromAbbr]

  return searcher.search(search.trim())
}
