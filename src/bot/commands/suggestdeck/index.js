import { FACTIONS } from '../../../constants/game'
import { CATEGORIES } from '../../../constants/decks'
import decks from '../../../data/decks'
import arrayRandom from '../../../helpers/arrayRandom'
import getIgnoredSearch from '../../../helpers/getIgnoredSearch'
import getCardsForSearch from '../../../helpers/getCardsForSearch'
import serialisation from '../../../helpers/serialisation'

export default content => {
  const search = content.toLowerCase()
  const ignoredTerms = []
  const searchParams = search.split(/\s+/g).reduce((search, term) => {
    if (Object.keys(FACTIONS).includes(term)) search.faction = term
    else if (Object.keys(CATEGORIES).includes(term)) search.category = term
    else {
      switch (term) {
        case 'ic':
        case 'red':
          search.faction = 'ironclad'
          break
        case 'sf':
        case 'green':
          search.faction = 'shadowfen'
          break
        case 'w':
        case 'wp':
        case 'blue':
          search.faction = 'winter'
          break
        case 'sw':
        case 'yellow':
          search.faction = 'swarm'
          break
        case 'd1':
          search.category = 'DIAMOND_1'
          break
        case 'equal':
        case 'tournament':
        case 'tourney':
          search.category = 'EQUALS'
          break
        default: {
          const [card] = getCardsForSearch(term)

          if (card) {
            search.including = card.id
          } else {
            ignoredTerms.push(term)
          }
        }
      }
    }

    return search
  }, {})

  if (Object.keys(searchParams).length === 0) {
    return 'https://stormbound-kitty.com/deck/' + arrayRandom(decks).id
  }

  const results = decks.filter(deck => {
    if (searchParams.faction && deck.faction !== searchParams.faction) {
      return false
    }

    if (searchParams.category && deck.category !== searchParams.category) {
      return false
    }

    if (
      searchParams.including &&
      !serialisation.deck
        .deserialise(deck.id)
        .map(card => card.id)
        .includes(searchParams.including)
    ) {
      return false
    }

    return true
  })

  return results.length > 0
    ? [
        'https://stormbound-kitty.com/deck/' + arrayRandom(results).id,
        getIgnoredSearch(search, ignoredTerms),
      ]
        .filter(Boolean)
        .join('\n')
    : undefined
}
