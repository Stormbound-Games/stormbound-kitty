import FuzzySearch from 'fuzzy-search'
import cards from '../../data/cards'
import arrayRandom from '../arrayRandom'
import getRawCardData from '../getRawCardData'
import getAbbreviations from '../getAbbreviations'

const ABBREVIATIONS = getAbbreviations('LOWERCASE')
const SEARCH_OPTIONS = { caseSensitive: false, sort: true }

export const searcher = new FuzzySearch(
  cards.filter(card => !card.token),
  ['name'],
  SEARCH_OPTIONS
)

export default search => {
  const needle = search.trim()

  if (needle.length === 0) return []

  const cardFromID = getRawCardData(needle.toUpperCase())

  if (cardFromID.id) return [cardFromID]

  const matchAbbr = ABBREVIATIONS[needle.toLowerCase()]
  const cardFromAbbrs = matchAbbr
    .map(definition => cards.find(card => card.name === definition))
    .filter(Boolean)

  if (cardFromAbbrs.length) return cardFromAbbrs

  return searcher.search(needle.trim())
}
