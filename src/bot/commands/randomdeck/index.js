import cards from '../../../data/cards'
import { FACTIONS } from '../../../constants/game'
import arrayRandom from '../../../helpers/arrayRandom'
import getRandomDeck from '../../../helpers/getRandomDeck'
import handleSearchAlias from '../../../helpers/handleSearchAlias'
import serialisation from '../../../helpers/serialisation'
import getIgnoredSearch from '../../../helpers/getIgnoredSearch'

const BASE_OPTIONS = {
  maxEpicCards: 4,
  maxLegendaryCards: 2,
  minFactionCards: 4,
  availableCards: cards.filter(card => !card.token),
}

const parseMessage = content => {
  const terms = content.split(/\s+/g)
  const params = {}
  const ignored = []

  terms.forEach(term => {
    if (Object.keys(FACTIONS).includes(term)) {
      params.faction = term
    } else {
      const [key, value] = handleSearchAlias(term)
      if (key) params[key] = value
      else ignored.push(term)
    }
  })

  return { params, ignored }
}

export default {
  command: 'randomdeck',
  name: 'Random deck',
  example: 'sf',
  description:
    'Get a randomly generated deck (matching the given faction if any)',
  icon: '🎲',
  handler: function (message) {
    const { params, ignored } = parseMessage(message.toLowerCase())
    const deck = getRandomDeck({
      ...BASE_OPTIONS,
      faction:
        params.faction ||
        arrayRandom(
          Object.keys(FACTIONS).filter(faction => faction !== 'neutral')
        ),
    })

    return [
      'https://stormbound-kitty.com/deck/' + serialisation.deck.serialise(deck),
      getIgnoredSearch(message, ignored),
    ]
      .filter(Boolean)
      .join('\n')
  },
}
