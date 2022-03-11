import { FACTIONS } from '~/constants/game'
import getDeckSearchDescription from '~/helpers/getDeckSearchDescription'
import getEmbed from '~/helpers/getEmbed'
import handleSearchAlias from '~/helpers/handleSearchAlias'
import searchCards from '~/helpers/searchCards'
import indexArray from '~/helpers/indexArray'
import getDeckTags from '~/api/decks/getDeckTags'
import getAbbreviations from '~/api/misc/getAbbreviations'
import getCards from '~/api/cards/getCards'

export const parseMessage = (cards, abbreviations, tags, content) => {
  const terms = content.split(/\s+/g)
  const params = {}
  const unmatched = []
  const ignored = []
  const tagsIndex = indexArray(tags, 'slug')

  terms.forEach(term => {
    if (FACTIONS.includes(term)) {
      params.faction = term
    } else if (term.toUpperCase() in tagsIndex) {
      if (!params.tags) params.tags = []
      params.tags.push(tagsIndex[term.toUpperCase()])
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
  const [card] = searchCards(cards, abbreviations, unmatched.join(' '))

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
      .setURL('https://stormbound-kitty.com/deck/featured')
      .setDescription(
        `Get a link to a deck search matching the given search criteria. It optionally accepts a faction, tags and card to include (regardless of order and casing). For instance, \`!${this.command} ic\`, \`!${this.command} wp d1\` or \`!${this.command} brawl kg\`.`
      )
  },
  handler: async function (message) {
    const tags = await getDeckTags()
    const cards = await getCards()
    const abbreviations = await getAbbreviations({ casing: 'LOWERCASE' })
    const cardsIndex = indexArray(cards)
    const embed = getEmbed()
      .setTitle(`${this.label}`)
      .setURL('https://stormbound-kitty.com/deck/featured')

    // If no additional parameters were given, reply with the overall featured
    // decks page
    if (message.length === 0) {
      embed.setDescription(getDeckSearchDescription(cardsIndex))

      return embed
    }

    const { params, ignored } = parseMessage(
      cards,
      abbreviations,
      tags,
      message.toLowerCase()
    )
    const searchParams = new URLSearchParams()

    for (let param in params) {
      if (param === 'tags')
        searchParams.set(
          param,
          params[param].map(tag => tag.slug)
        )
      else searchParams.set(param, params[param])
    }

    const url =
      'https://stormbound-kitty.com/deck/featured' +
      (searchParams.toString().length ? '?' : '') +
      searchParams.toString()

    embed.setDescription(
      getDeckSearchDescription(cardsIndex, params) + '\n' + url
    )

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
