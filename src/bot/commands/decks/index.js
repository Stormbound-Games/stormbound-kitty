import { FACTIONS } from '../../../constants/game'
import { CATEGORIES } from '../../../constants/decks'
import getIgnoredSearch from '../../../helpers/getIgnoredSearch'
import getCardsForSearch from '../../../helpers/getCardsForSearch'

export default content => {
  const search = content.toLowerCase().trim()
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
    } else if (Object.keys(CATEGORIES).includes(term.toUpperCase())) {
      params.set('category', term.toUpperCase())
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
          const [card] = getCardsForSearch(term)

          if (card) {
            params.set('including', card.id)
          } else {
            ignoredTerms.push(term)
          }
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
