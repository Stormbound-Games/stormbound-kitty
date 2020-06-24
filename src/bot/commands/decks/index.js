import { FACTIONS } from '../../../constants/game'
import { CATEGORIES } from '../../../constants/decks'
import getIgnoredSearch from '../../../helpers/getIgnoredSearch'
import searchCards from '../../../helpers/searchCards'
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
  const [card] = searchCards(unmatched.join(' '))

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
  help: function () {
    return `🔍  **Deck Search:** Get a link to a deck search matching the given search criteria. It optionally accepts a faction, category and card to include (regardless of order and casing). For instance, \`!${this.command} ic\`, \`!${this.command} wp d1\` or \`!${this.command} brawl kg\`.`
  },
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
