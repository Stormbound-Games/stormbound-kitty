import Fuse from 'fuse.js'
import CARDS from '~/data/cards'
import getRawCardData from '~/helpers/getRawCardData'
import getAbbreviations from '~/helpers/getAbbreviations'

const ABBREVIATIONS = getAbbreviations('LOWERCASE')

export const searcher = new Fuse(
  CARDS.filter(card => !card.token),
  {
    keys: ['name'],
    minMatchCharLength: 3,
    threshold: 0.4,
    ignoreFieldNorm: true,
  }
)

const searchCards = search => {
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

export default searchCards
