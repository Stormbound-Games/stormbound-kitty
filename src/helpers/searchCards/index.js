import FuzzySearch from 'fuzzy-search'
import cards from '../../data/cards'
import getRawCardData from '../getRawCardData'
import getAbbreviations from '../getAbbreviations'
import { RELEASE_DATE } from '../../constants/game'

const ABBREVIATIONS = getAbbreviations('LOWERCASE')
const SEARCH_OPTIONS = { caseSensitive: false, sort: true }

export const searcher = new FuzzySearch(
  cards
    .filter(card => !card.token)
    .filter(card =>
      card.id === 'N77' && new Date() < RELEASE_DATE ? false : true
    ),
  ['name'],
  SEARCH_OPTIONS
)

export default search => {
  const needle = search.trim()

  if (needle.length < 2) return []

  const cardFromID = getRawCardData(needle.toUpperCase())

  if (cardFromID.id) return [cardFromID]

  const matchAbbr = (ABBREVIATIONS[needle.toLowerCase()] || [])
    .map(definition => cards.find(card => card.name === definition))
    .filter(Boolean)

  if (matchAbbr.length) return matchAbbr

  return searcher.search(needle.trim())
}
