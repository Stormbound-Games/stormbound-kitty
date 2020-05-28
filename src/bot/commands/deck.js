import { FACTIONS } from '../../constants/game'
import { CATEGORIES } from '../../constants/decks'
import { searcher } from '../../helpers/getCardsForSearch'
import getRawCardData from '../../helpers/getRawCardData'
import getCardAbbreviations from '../../helpers/getCardAbbreviations'

const CARD_ABBREVIATIONS = getCardAbbreviations()

export default content => {
  const search = content.toLowerCase()
  const params = new URLSearchParams()

  if (search.length === 0) return

  search.split(/\s+/g).forEach(term => {
    if (Object.keys(FACTIONS).includes(term)) params.set('faction', term)
    else if (Object.keys(CATEGORIES).includes(term))
      params.set('category', term)
    else {
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
          return params.set('category', 'DIAMOND_1')
        case 'equal':
        case 'tournament':
        case 'tourney':
          return params.set('category', 'EQUALS')
        default: {
          // If the given search term is a known abbreviation, consider the
          // matching card as the `including` parameter.
          const abbreviation = CARD_ABBREVIATIONS[term]
          if (abbreviation) {
            return params.set('including', getRawCardData(abbreviation).id)
          }

          // If the given search term yields any results with a fuzzy search,
          // consider the most relevant (first) one as the `including` param.
          const results = searcher.search(term)
          if (results.length > 0) {
            return params.set('including', results[0].id)
          }
        }
      }
    }
  })

  if (params.toString().length === 0) return

  return 'https://stormbound-kitty.com/deck/suggestions?' + params.toString()
}
