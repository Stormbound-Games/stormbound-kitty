import { TRIVIA_CHANNEL } from '../../../constants/bot'
import decks from '../../../data/decks'
import arrayRandom from '../../../helpers/arrayRandom'
import getIgnoredSearch from '../../../helpers/getIgnoredSearch'
import serialisation from '../../../helpers/serialisation'
import { parseMessage } from '../decks'

export default {
  command: 'suggestdeck',
  name: 'Deck suggestion',
  example: 'sf qordia',
  description: 'Get a deck suggestion matching given search criteria',
  icon: '✅',
  isAllowed: channel => channel.id !== TRIVIA_CHANNEL,
  handler: function (message) {
    const { params, ignored } = parseMessage(message.toLowerCase())

    if (Object.keys(params).length === 0) {
      return (
        'https://stormbound-kitty.com/deck/' +
        arrayRandom(
          // If the category is not provided, assume the expectation is to have
          // a deck that works and is competitive under normal circumstances (so
          // ranking and Diamond) and therefore discard any Brawl/Equals deck.
          decks.filter(deck => !['BRAWL', 'EQUALS'].includes(deck.category))
        ).id
      )
    }

    const results = decks.filter(deck => {
      if (params.faction && deck.faction !== params.faction) {
        return false
      }

      if (params.category) {
        if (deck.category !== params.category) return false
      } else {
        // If the category is not provided, assume the expectation is to have a
        // deck that works and is competitive under normal circumstances (so
        // ranking and Diamond) and therefore discard any Brawl/Equals deck.
        if (['BRAWL', 'EQUALS'].includes(deck.category)) return false
      }

      if (
        params.including &&
        !serialisation.deck
          .deserialise(deck.id)
          .map(card => card.id)
          .includes(params.including)
      ) {
        return false
      }

      return true
    })

    return results.length > 0
      ? [
          'https://stormbound-kitty.com/deck/' + arrayRandom(results).id,
          getIgnoredSearch(message, ignored),
        ]
          .filter(Boolean)
          .join('\n')
      : undefined
  },
}
