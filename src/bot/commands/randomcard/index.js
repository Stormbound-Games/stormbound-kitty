import CARDS from '~/data/cards'
import { FACTIONS, RACES, RARITIES, TYPES } from '~/constants/game'
import arrayRandom from '~/helpers/arrayRandom'
import getEmbed from '~/helpers/getEmbed'
import getIgnoredSearch from '~/helpers/getIgnoredSearch'
import handleSearchAlias from '~/helpers/handleSearchAlias'

const linkify = card => 'https://stormbound-kitty.com/card/' + card.id

const parseMessage = content => {
  const terms = content.split(/\s+/g)
  const ignored = []
  const filters = []

  terms.forEach(term => {
    const filter = {}

    // Determine whether the method is inclusive or exclusive
    filter.method = term.startsWith('!') ? 'EXC' : 'INC'

    // Remove any leading bang from the search term to match it
    filter.value = term.replace('!', '')

    if (filter.value === 'hero') {
      filter.key = 'hero'
      filter.value = true
    } else if (filter.value === 'elder') {
      filter.key = 'elder'
      filter.value = true
    } else if (Object.keys(FACTIONS).includes(filter.value)) {
      filter.key = 'faction'
    } else if (Object.keys(RACES).includes(filter.value)) {
      filter.key = 'race'
    } else if (Object.keys(RARITIES).includes(filter.value)) {
      filter.key = 'rarity'
    } else if (Object.keys(TYPES).includes(filter.value)) {
      filter.key = 'type'
    } else {
      const [key, value] = handleSearchAlias(filter.value)
      if (key) {
        filter.key = key
        filter.value = value
      } else ignored.push(filter.value)
    }

    if (filter.key) {
      filters.push(filter)
    }
  })

  return { filters, ignored }
}

export default {
  command: 'randomcard',
  label: '🃏  Random Card',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com')
      .setDescription(
        `Get a random card matching the given search criteria. It optionally accepts a unit modifier, faction, type, race or rarity (regardless of order or casing, with or a leading exclamation mark for negative filtering). For instance, \`!${this.command} elder ic\`, \`!${this.command} !spell\` or \`!${this.command} satyr common\`.`
      )
  },
  handler: function (message) {
    if (message.length === 0) {
      return linkify(arrayRandom(CARDS))
    }

    const { filters, ignored } = parseMessage(message.toLowerCase())

    if (filters.length === 0) return

    const results = CARDS.filter(card => !card.token).filter(card => {
      for (const { key, method, value } of filters) {
        if (method === 'INC' && card[key] !== value) return false
        if (method === 'EXC' && card[key] === value) return false
      }

      return true
    })

    if (results.length === 0) return

    return [linkify(arrayRandom(results)), getIgnoredSearch(message, ignored)]
      .filter(Boolean)
      .join('\n')
  },
}
