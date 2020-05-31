import cards from '../../../data/cards'
import { FACTIONS, RACES, RARITIES, TYPES } from '../../../constants/game'
import { TRIVIA_CHANNEL } from '../../../constants/bot'
import arrayRandom from '../../../helpers/arrayRandom'
import getIgnoredSearch from '../../../helpers/getIgnoredSearch'
import handleSearchAlias from '../../../helpers/handleSearchAlias'

const linkify = card => 'https://stormbound-kitty.com/card/' + card.id

const parseMessage = content => {
  const terms = content.split(/\s+/g)
  const params = {}
  const ignored = []

  terms.forEach(term => {
    if (term === 'hero') params.hero = true
    else if (term === 'elder') params.elder = true
    else if (Object.keys(FACTIONS).includes(term)) params.faction = term
    else if (Object.keys(RACES).includes(term)) params.race = term
    else if (Object.keys(RARITIES).includes(term)) params.rarity = term
    else if (Object.keys(TYPES).includes(term)) params.type = term
    else {
      const [key, value] = handleSearchAlias(term)
      if (key) params[key] = value
      else ignored.push(term)
    }
  })

  return { params, ignored }
}

export default {
  command: 'randomcard',
  name: 'Random card',
  example: 'ic spell rare',
  description: 'Get a random card matching given search criteria',
  icon: '🃏',
  isAllowed: channel => channel.id !== TRIVIA_CHANNEL,
  handler: function (message) {
    if (message.length === 0) {
      return linkify(arrayRandom(cards))
    }

    const { params, ignored } = parseMessage(message.toLowerCase())

    if (Object.keys(params).length === 0) return

    const results = cards
      .filter(card => !card.token)
      .filter(card => {
        if (params.hero && !card.hero) return false
        if (params.elder && !card.elder) return false
        if (params.faction && card.faction !== params.faction) return false
        if (params.type && card.type !== params.type) return false
        if (params.rarity && card.rarity !== params.rarity) return false
        if (params.race && card.race !== params.race) return false
        return true
      })

    if (results.length === 0) return

    return [linkify(arrayRandom(results)), getIgnoredSearch(message, ignored)]
      .filter(Boolean)
      .join('\n')
  },
}
