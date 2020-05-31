import cards from '../../../data/cards'
import { FACTIONS } from '../../../constants/game'
import { TRIVIA_CHANNEL } from '../../../constants/bot'
import arrayRandom from '../../../helpers/arrayRandom'
import getRandomDeck from '../../../helpers/getRandomDeck'
import getRawCardData from '../../../helpers/getRawCardData'
import serialisation from '../../../helpers/serialisation'
import getIgnoredSearch from '../../../helpers/getIgnoredSearch'
import { parseMessage } from '../decks'

const ALLOWED_FACTIONS = Object.keys(FACTIONS).filter(
  faction => faction !== 'neutral'
)
const BASE_OPTIONS = {
  maxEpicCards: 4,
  maxLegendaryCards: 2,
  minFactionCards: 4,
  availableCards: cards.filter(card => !card.token),
}

const getDeckFaction = params => {
  const card = getRawCardData(params.including)

  // The random deck’s faction should be the faction of the included card if
  // any and if not neutral, or the given faction if provided, or a random
  // faction that is not neutral.
  return (
    (card.faction === 'neutral' ? null : card.faction) ||
    params.faction ||
    arrayRandom(ALLOWED_FACTIONS)
  )
}

export default {
  command: 'randomdeck',
  name: 'Random deck',
  example: 'sf',
  description:
    'Get a randomly generated deck (matching the given faction if any)',
  icon: '🎲',
  isAllowed: channel => channel.id !== TRIVIA_CHANNEL,
  handler: function (message) {
    const { params, ignored } = parseMessage(message.toLowerCase())
    const faction = getDeckFaction(params)
    const initialCards = params.including
      ? [getRawCardData(params.including)]
      : undefined
    const deck = getRandomDeck({ ...BASE_OPTIONS, initialCards, faction })

    return [
      'https://stormbound-kitty.com/deck/' + serialisation.deck.serialise(deck),
      getIgnoredSearch(message, ignored),
    ]
      .filter(Boolean)
      .join('\n')
  },
}
