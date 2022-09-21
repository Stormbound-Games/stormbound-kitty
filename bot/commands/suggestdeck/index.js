import { SlashCommandBuilder } from 'discord.js'
import arrayRandom from '#helpers/arrayRandom'
import getFactionFromDeckID from '#helpers/getFactionFromDeckID'
import getDecks from '#api/decks/getDecks'

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

  async execute(interaction) {
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
      ephemeral: true,
    })
  },
}

export default suggestdeck
