import { FACTIONS } from '../../constants/game'
import { CATEGORIES } from '../../constants/decks'
import { searcher } from '../../helpers/getCardsForSearch'
import getRawCardData from '../../helpers/getRawCardData'
import getCardAbbreviations from '../../helpers/getCardAbbreviations'
import getIgnoredSearch from '../../helpers/getIgnoredSearch'

const CARD_ABBREVIATIONS = getCardAbbreviations()

export default content => {
  const search = content.toLowerCase()
  const params = new URLSearchParams()
  const ignoredTerms = []

  // If no additional parameters were given, reply with the overall deck
  // suggestions page
  if (search.length === 0) {
    return 'https://stormbound-kitty.com/deck/suggestions'
  }

  search.split(/\s+/g).forEach(term => {
    if (Object.keys(FACTIONS).includes(term)) {
      params.set('faction', term)
    } else if (Object.keys(CATEGORIES).includes(term)) {
      params.set('category', term)
    } else {
      switch (term) {
        case 'ic':
        case 'red':
          params.set('faction', 'ironclad')
          break
        case 'sf':
        case 'green':
          params.set('faction', 'shadowfen')
          break
        case 'w':
        case 'wp':
        case 'blue':
          params.set('faction', 'winter')
          break
        case 'sw':
        case 'yellow':
          params.set('faction', 'swarm')
          break
        case 'd1':
        case 'diamond':
          params.set('category', 'DIAMOND_1')
          break
        case 'equal':
        case 'tournament':
        case 'tourney':
          params.set('category', 'EQUALS')
          break
        default: {
          // If the given search term is a known abbreviation, consider the
          // matching card as the `including` parameter.
          const abbreviation = CARD_ABBREVIATIONS[term]
          if (abbreviation) {
            params.set('including', getRawCardData(abbreviation).id)
            break
          }

          // If the given search term yields any results with a fuzzy search,
          // consider the most relevant (first) one as the `including` param.
          const results = searcher.search(term)
          if (results.length > 0) {
            params.set('including', results[0].id)
            break
          }

          ignoredTerms.push(term)
        }
      }
    }
  })

  return [
    'https://stormbound-kitty.com/deck/suggestions' +
      (params.toString().length ? '?' : '') +
      params.toString(),
    getIgnoredSearch(search, ignoredTerms),
  ]
    .filter(Boolean)
    .join('\n')
}
