import { SlashCommandBuilder } from 'discord.js'
import { FACTIONS } from '#constants/game'
import handleSearchAlias from '#helpers/handleSearchAlias'
import searchCards from '#helpers/searchCards'
import indexArray from '#helpers/indexArray'
import getDeckTags from '#api/decks/getDeckTags'

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
  data: new SlashCommandBuilder()
    .setName('decks')
    .setDescription(
      'Get a link to a deck search matching the given search criteria.'
    )
    .addStringOption(option =>
      option.setName('input').setDescription('Optional search terms')
    ),

  async execute(interaction, client) {
    const message = interaction.options.getString('input')
    const tags = await getDeckTags()

    // If no additional parameters were given, reply with the overall featured
    // decks page
    if (!message) {
      return interaction.reply({
        content: 'https://stormbound-kitty.com/decks',
        ephemeral: true,
      })
    }

    const searchParams = new URLSearchParams()
    const { params } = parseMessage(
      [...client.cards.values()],
      Object.fromEntries(client.abbreviations),
      tags,
      message.toLowerCase()
    )

    for (let param in params) {
      if (param === 'tags')
        searchParams.set(
          param,
          params[param].map(tag => tag.slug)
        )
      else searchParams.set(param, params[param])
    }

    const url =
      'https://stormbound-kitty.com/decks' +
      (searchParams.toString().length ? '?' : '') +
      searchParams.toString()

    return interaction.reply({ content: url, ephemeral: true })
  },
}

export default decks
