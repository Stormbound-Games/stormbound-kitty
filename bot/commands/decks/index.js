import { FACTIONS } from '~/constants/game'
import { TAGS } from '~/constants/deck'
import getDeckSearchDescription from '~/helpers/getDeckSearchDescription'
import getEmbed from '~/helpers/getEmbed'
import handleSearchAlias from '~/helpers/handleSearchAlias'
import searchCards from '~/helpers/searchCards'

export const parseMessage = content => {
  const terms = content.split(/\s+/g)
  const params = {}
  const unmatched = []
  const ignored = []

  terms.forEach(term => {
    if (Object.keys(FACTIONS).includes(term)) {
      params.faction = term
    } else if (Object.keys(TAGS).includes(term.toUpperCase())) {
      if (!params.tags) params.tags = []
      params.tags.push(term.toUpperCase())
    } else {
      const [key, value] = handleSearchAlias(term)
      if (key) {
        if (Array.isArray(value)) {
          if (!params[key]) params[key] = []
          params[key].push(...value)
        }
        params[key] = value
      } else unmatched.push(term)
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

const decks = {
  command: 'decks',
  label: '🔍  Deck Search',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/deck/suggestions')
      .setDescription(
        `Get a link to a deck search matching the given search criteria. It optionally accepts a faction, tags and card to include (regardless of order and casing). For instance, \`!${this.command} ic\`, \`!${this.command} wp d1\` or \`!${this.command} brawl kg\`.`
      )
  },
  handler: function (message) {
    const embed = getEmbed()
      .setTitle(`${this.label}`)
      .setURL('https://stormbound-kitty.com/deck/suggestions')

    // If no additional parameters were given, reply with the overall deck
    // suggestions page
    if (message.length === 0) {
      embed.setDescription(getDeckSearchDescription())

      return embed
    }

    const { params, ignored } = parseMessage(message.toLowerCase())
    const searchParams = new URLSearchParams()

    for (let param in params) {
      searchParams.set(param, params[param])
    }

    const url =
      'https://stormbound-kitty.com/deck/suggestions' +
      (searchParams.toString().length ? '?' : '') +
      searchParams.toString()

    embed.setDescription(getDeckSearchDescription(params) + '\n' + url)

    embed.setURL(url)

    if (ignored.length > 0) {
      embed.addFields({
        name: 'Ignored terms',
        value: ignored.join(', '),
      })
    }

    return embed
  },
}

export default decks
