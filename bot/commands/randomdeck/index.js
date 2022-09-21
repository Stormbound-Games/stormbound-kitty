import { SlashCommandBuilder } from 'discord.js'
import searchCards from '#helpers/searchCards'
import getRandomDeck from '#helpers/getRandomDeck'
import serialization from '#helpers/serialization'
import getAbbreviations from '#api/misc/getAbbreviations'
import getCards from '#api/cards/getCards'

export const parseIncluded = (allCards, abbreviations, message) => {
  const parts = message.split(/\s*,\s*/g).filter(Boolean)
  const cards = []

  parts.forEach(part => {
    // Make sure not to include a card twice. For instance, `herald, herald`
    // should include Pan Heralds and Herald’s Hymn, but not one of them twice.
    // Same goes for other cases, such as `dread, dread`.
    const card = searchCards(allCards, abbreviations, part).find(
      card => !cards.map(c => c.id).includes(card.id)
    )
    if (card) cards.push(card)
  })

  return cards
}

const randomdeck = {
  data: new SlashCommandBuilder()
    .setName('randomdeck')
    .setDescription('Randomly generate a deck.')
    .addStringOption(option =>
      option
        .setName('faction')
        .setDescription('Deck faction')
        .addChoices(
          { name: 'Ironclad', value: 'ironclad' },
          { name: 'Winter', value: 'winter' },
          { name: 'Swarm', value: 'swarm' },
          { name: 'Shadowfen', value: 'shadowfen' }
        )
    )
    .addStringOption(option =>
      option
        .setName('including')
        .setDescription('Included cards (separated by commas)')
    ),

  async execute(interaction) {
    const faction = interaction.options.getString('faction')
    const message = interaction.options.getString('including') || ''
    const cards = await getCards()
    const abbreviations = await getAbbreviations({ casing: 'LOWERCASE', cards })
    const including = parseIncluded(
      cards,
      abbreviations,
      message?.toLowerCase()
    )

    const resolvedFaction = validateFaction(faction, including)

    // If there was an issue resolving the faction, return early.
    if (!resolvedFaction) {
      return interaction.reply({
        content:
          'Unfortunately, there was an issue generating a random deck. This might be because of conflicting argument (e.g. `wp rof`, `fc, mia`…).',
        ephemeral: true,
      })
    }

    const initialCards = including.length ? including.slice(0, 3) : undefined
    const deck = getRandomDeck({
      availableCards: cards,
      initialCards,
      faction: resolvedFaction,
    })
    const id = serialization.deck.serialize(deck)

    return interaction.reply({
      content: 'https://stormbound-kitty.com/deck/' + id,
      ephemeral: true,
    })
  },
}

export default randomdeck
