import { SlashCommandBuilder } from 'discord.js'
import { FACTIONS } from '#constants/game'
import arrayRandom from '#helpers/arrayRandom'
import getFactionFromDeckID from '#helpers/getFactionFromDeckID'
import indexArray from '#helpers/indexArray'
import searchCards from '#helpers/searchCards'
import handleSearchAlias from '#helpers/handleSearchAlias'
import getDecks from '#api/decks/getDecks'

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

const suggestdeck = {
  data: new SlashCommandBuilder()
    .setName('suggestdeck')
    .setDescription('Get a featured deck.')
    .addStringOption(option =>
      option
        .setName('faction')
        .setDescription('The deck faction.')
        .addChoices(
          { name: 'Ironclad', value: 'ironclad' },
          { name: 'Winter', value: 'winter' },
          { name: 'Swarm', value: 'swarm' },
          { name: 'Shadowfen', value: 'shadowfen' }
        )
    ),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const decks = await getDecks()
    const faction = interaction.options.getString('faction')
    const candidates = decks
      .filter(deck => !faction || faction === getFactionFromDeckID(deck.id))
      .filter(deck => {
        const tagSlugs = deck.tags.map(tag => tag.slug)
        return !tagSlugs.includes('BRAWL') && !tagSlugs.includes('EQUALS')
      })
    const deck = arrayRandom(candidates)

    return interaction.reply({
      content: 'https://stormbound-kitty.com/deck/' + deck.id,
      ephemeral,
    })
  },
}

export default suggestdeck
