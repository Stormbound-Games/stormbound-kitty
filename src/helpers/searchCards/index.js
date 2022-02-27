import Fuse from 'fuse.js'
import getAbbreviations from '~/helpers/getAbbreviations'

const SEARCH_OPTIONS = {
  keys: ['name'],
  minMatchCharLength: 3,
  threshold: 0.4,
  ignoreFieldNorm: true,
}

const searchCards = (cards, search) => {
  const searcher = new Fuse(
    cards.filter(card => !card.token),
    SEARCH_OPTIONS
  )
  const needle = search.trim()

  if (needle.length < 2) return []

  const cardFromID = cards.find(card => card.id == needle.toUpperCase())

  if (cardFromID.id) return [cardFromID]

  const abbreviations = getAbbreviations(cards, 'LOWERCASE')
  const matchAbbr = (abbreviations[needle.toLowerCase()] || [])
    .map(definition => {
      const card = cards.find(card => card.name === definition)

      return card.id ? card : null
    })
    .filter(Boolean)

  if (matchAbbr.length) return matchAbbr

  return searcher.search(needle).map(result => result.item)
}

export default searchCards
