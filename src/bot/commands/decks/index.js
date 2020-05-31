import { FACTIONS } from '../../../constants/game'
import { CATEGORIES } from '../../../constants/decks'
import { TRIVIA_CHANNEL } from '../../../constants/bot'
import getIgnoredSearch from '../../../helpers/getIgnoredSearch'
import getCardsForSearch from '../../../helpers/getCardsForSearch'
import handleSearchAlias from '../../../helpers/handleSearchAlias'

export const parseMessage = content => {
  const terms = content.split(/\s+/g)
  const params = {}
  const unmatched = []
  const ignored = []

  terms.forEach(term => {
    if (Object.keys(FACTIONS).includes(term)) {
      params.faction = term
    } else if (Object.keys(CATEGORIES).includes(term.toUpperCase())) {
      params.category = term.toUpperCase()
    } else {
      const [key, value] = handleSearchAlias(term)
      if (key) params[key] = value
      else unmatched.push(term)
    }
  })

  // After having gone through all term individually, join the ones that didn’t
  // match anything to perform a card search.
  const [card] = getCardsForSearch(unmatched.join(' '))

  // If a card was found with the unmatching terms, store it, otherwise ignore
  // the unmatching terms.
  if (card) {
    params.including = card.id
  } else {
    Array.prototype.push.apply(ignored, unmatched)
  }

  return { params, ignored }
}

export default {
  command: 'decks',
  name: 'Deck search',
  example: 'ic d1 mia',
  description: 'Get a link to a deck search matching given search criteria',
  icon: '🔍',
  isAllowed: channel => channel.id !== TRIVIA_CHANNEL,
  handler: function (message) {
    // If no additional parameters were given, reply with the overall deck
    // suggestions page
    if (message.length === 0) {
      return 'https://stormbound-kitty.com/deck/suggestions'
    }

    const { params, ignored } = parseMessage(message.toLowerCase())
    const searchParams = new URLSearchParams()

    for (let param in params) {
      searchParams.set(param, params[param])
    }

    return [
      'https://stormbound-kitty.com/deck/suggestions' +
        (searchParams.toString().length ? '?' : '') +
        searchParams.toString(),
      getIgnoredSearch(message, ignored),
    ]
      .filter(Boolean)
      .join('\n')
  },
}
