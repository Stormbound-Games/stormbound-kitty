import FuzzySearch from 'fuzzy-search'
import cards from '../../data/cards'
import getRawCardData from '../getRawCardData'
import getCardAbbreviations from '../getCardAbbreviations'
import toArray from '../toArray'

const SEARCH_OPTIONS = { caseSensitive: false, sort: true }

export const searcher = new FuzzySearch(
  cards.filter(card => !card.token),
  ['name'],
  SEARCH_OPTIONS
)

const CARD_ABBREVIATIONS = getCardAbbreviations()

export default search => {
  return toArray(
    // Handle Stormbound-Kitty IDs — regardless of the case (e.g. `N1`)
    getRawCardData(search.toUpperCase()) ||
      // Handle abbreviated names — regardless of the case (e.g. `RoF`)
      getRawCardData(CARD_ABBREVIATIONS[search.toLowerCase()]) ||
      // Handle loose names with fuzzy-searching
      searcher.search(search.trim())
  )
}
