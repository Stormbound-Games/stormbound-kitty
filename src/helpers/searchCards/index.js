import Fuse from 'fuse.js'
import cards from '../../data/cards'
import getRawCardData from '../getRawCardData'
import getAbbreviations from '../getAbbreviations'

const ABBREVIATIONS = getAbbreviations('LOWERCASE')

export const searcher = new Fuse(
  cards.filter(card => !card.token),
  { keys: ['name'] }
)

export default search => {
  const needle = search.trim()

  if (needle.length < 2) return []

  const cardFromID = getRawCardData(needle.toUpperCase())

  if (cardFromID.id) return [cardFromID]

  const matchAbbr = (ABBREVIATIONS[needle.toLowerCase()] || [])
    .map(definition => {
      const card = getRawCardData(definition, 'name')

      return card.id ? card : null
    })
    .filter(Boolean)

  if (matchAbbr.length) return matchAbbr

  return searcher.search(needle).map(result => result.item)
}
