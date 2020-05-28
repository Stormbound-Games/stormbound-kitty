import { FACTIONS } from '../../constants/game'
import { CATEGORIES } from '../../constants/decks'
import { searcher } from '../../helpers/getCardsForSearch'
import decks from '../../data/decks'
import arrayRandom from '../../helpers/arrayRandom'
import getRawCardData from '../../helpers/getRawCardData'
import getCardAbbreviations from '../../helpers/getCardAbbreviations'
import serialisation from '../../helpers/serialisation'

const CARD_ABBREVIATIONS = getCardAbbreviations()

export default content => {
  const search = content.toLowerCase()

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
          // If the given search term is a known abbreviation, consider the
          // matching card as the `including` parameter.
          const abbreviation = CARD_ABBREVIATIONS[term]
          if (abbreviation) {
            search.including = getRawCardData(abbreviation).id
            break
          }

          // If the given search term yields any results with a fuzzy search,
          // consider the most relevant (first) one as the `including` param.
          const results = searcher.search(term)
          if (results.length > 0) {
            search.including = results[0].id
            break
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

  return 'https://stormbound-kitty.com/deck/' + arrayRandom(results).id
}
