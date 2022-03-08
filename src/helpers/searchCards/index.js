import Fuse from 'fuse.js'

const SEARCH_OPTIONS = {
  keys: ['name'],
  minMatchCharLength: 3,
  threshold: 0.3,
  ignoreFieldNorm: true,
}

const searchCards = (cards = [], abbreviations = {}, search = '') => {
  const searcher = new Fuse(
    cards.filter(card => !card.token),
    SEARCH_OPTIONS
  )
  const needle = search.trim()

  if (needle.length < 2) return []

  const cardFromID = cards.find(card => card.id == needle.toUpperCase())

  if (cardFromID) return [cardFromID]

  const matchAbbr = (abbreviations[needle.toLowerCase()] || [])
    .map(definition => cards.find(card => card.name === definition))
    .filter(Boolean)

  if (matchAbbr.length) return matchAbbr

  return searcher.search(needle).map(result => result.item)
}

export default searchCards
