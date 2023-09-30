import { SlashCommandBuilder } from 'discord.js'
import randomizeCard from '#helpers/randomizeCard'
import serialization from '#helpers/serialization'
import minifyUrl from '#helpers/minifyUrl'

const randomcard = {
  data: new SlashCommandBuilder()
    .setName('randomcard')
    .setDescription('Randomly generate a card.')
    .addStringOption(option =>
      option
        .setName('faction')
        .setDescription('The card faction.')
        .addChoices(
          { name: 'Neutral', value: 'neutral' },
          { name: 'Ironclad', value: 'ironclad' },
          { name: 'Winter', value: 'winter' },
          { name: 'Swarm', value: 'swarm' },
          { name: 'Shadowfen', value: 'shadowfen' },
        ),
    )
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('The card type.')
        .addChoices(
          { name: 'Unit', value: 'unit' },
          { name: 'Structure', value: 'structure' },
          { name: 'Spell', value: 'spell' },
        ),
    ),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const faction = interaction.options.getString('faction')
    const type = interaction.options.getString('type')
    const card = randomizeCard({ faction, type })
    const id = serialization.card.serialize(card)

    // The URL minification could take longer than the 3-second window imposed
    // by Discord so it is best to use a deferred reply.
    await interaction.deferReply({ ephemeral })

    const url = 'https://stormbound-kitty.com/card/' + id
    const content = client.SKIP_MINIFICATION
      ? url
      : await minifyUrl(url, { baseUrl: 'https://stormbound-kitty.com' })

    return interaction.editReply({ content, ephemeral })
  },
}

export default randomcard
