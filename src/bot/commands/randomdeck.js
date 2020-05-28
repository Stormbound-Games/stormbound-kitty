import cards from '../../data/cards'
import { FACTIONS } from '../../constants/game'
import arrayRandom from '../../helpers/arrayRandom'
import getRandomDeck from '../../helpers/getRandomDeck'
import serialisation from '../../helpers/serialisation'

const BASE_OPTIONS = {
  maxEpicCards: 4,
  maxLegendaryCards: 2,
  minFactionCards: 4,
  availableCards: cards.filter(card => !card.token),
}

export default content => {
  const search = content.replace('!randomdeck', '').trim()
  const ignoredTerms = []
  const searchTerms = search.split(/\s+/g).reduce((search, term) => {
    if (Object.keys(FACTIONS).includes(term)) search.faction = term
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
        default:
          ignoredTerms.push(term)
          break
      }
    }

    return search
  }, {})

  const deck = getRandomDeck({
    ...BASE_OPTIONS,
    faction: searchTerms.faction || arrayRandom(Object.keys(FACTIONS)),
  })

  const adjustSearch = search
    .split(/\s+/g)
    .map(search => (ignoredTerms.includes(search) ? `~~${search}~~` : search))
    .join(' ')

  return [
    'https://stormbound-kitty.com/deck/' + serialisation.deck.serialise(deck),
    ignoredTerms.length > 0 ? `*Search: ${adjustSearch}*` : '',
  ]
    .filter(Boolean)
    .join('\n')
}
