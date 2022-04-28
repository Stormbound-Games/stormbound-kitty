import { FACTIONS, UNIT_TYPES, RARITIES, TYPES } from '~/constants/game'
import arrayRandom from '~/helpers/arrayRandom'
import getEmbed from '~/helpers/getEmbed'
import getIgnoredSearch from '~/helpers/getIgnoredSearch'
import handleSearchAlias from '~/helpers/handleSearchAlias'
import getCards from '~/api/cards/getCards'

const linkify = card => `https://stormbound-kitty.com/cards/${card.id}`

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

    if (FACTIONS.includes(filter.value)) {
      filter.key = 'faction'
    } else if (UNIT_TYPES.includes(filter.value)) {
      filter.key = 'unitTypes'
    } else if (RARITIES.includes(filter.value)) {
      filter.key = 'rarity'
    } else if (TYPES.includes(filter.value)) {
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

const randomcard = {
  command: 'randomcard',
  label: '🃏  Random Card',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com')
      .setDescription(
        `Get a random card matching the given search criteria. It optionally accepts a unit modifier, faction, card type, unit type or rarity (regardless of order or casing, with or a leading exclamation mark for negative filtering). For instance, \`!${this.command} elder ic\`, \`!${this.command} !spell\` or \`!${this.command} satyr common\`.`
      )
  },
  handler: async function (message) {
    const cards = await getCards()

    if (message.length === 0) {
      return linkify(arrayRandom(cards))
    }

    const { filters, ignored } = parseMessage(message.toLowerCase())

    if (filters.length === 0) return

    const results = cards
      .filter(card => !card.token)
      .filter(card => {
        for (const { key, method, value } of filters) {
          if (Array.isArray(card[key])) {
            if (method === 'INC' && !card[key].includes(value)) return false
            if (method === 'EXC' && card[key].includes(value)) return false
          } else {
            if (method === 'INC' && card[key] !== value) return false
            if (method === 'EXC' && card[key] === value) return false
          }
        }

        return true
      })

    if (results.length === 0) return

    return [linkify(arrayRandom(results)), getIgnoredSearch(message, ignored)]
      .filter(Boolean)
      .join('\n')
  },
}

export default randomcard
