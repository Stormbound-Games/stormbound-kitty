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
  const needle = search.trim()

  if (needle.length === 0) return []

  const cardFromID = getRawCardData(needle.toUpperCase())

  if (cardFromID.id) return [cardFromID]

  const cardFromAbbr = getRawCardData(CARD_ABBREVIATIONS[needle.toLowerCase()])

  if (cardFromAbbr.id) return [cardFromAbbr]

  return searcher.search(needle.trim())
}
