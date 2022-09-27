import fetch from 'node-fetch'
import { SlashCommandBuilder } from 'discord.js'
import randomizeCard from '#helpers/randomizeCard'
import serialization from '#helpers/serialization'
import trackBotCommand from '#helpers/trackBotCommand'

const BASE_URL = 'https://stormbound-kitty.com/card/'

const minify = async url => {
  try {
    const response = await fetch(
      'https://stormbound-kitty.com/api/shorten?url=' + encodeURIComponent(url),
      { method: 'GET' }
    )
    const data = await response.json()

    return data.shortLink || url
  } catch (error) {
    console.error(error)
    return url
  }
}
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
          { name: 'Shadowfen', value: 'shadowfen' }
        )
    )
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('The card type.')
        .addChoices(
          { name: 'Unit', value: 'unit' },
          { name: 'Structure', value: 'structure' },
          { name: 'Spell', value: 'spell' }
        )
    ),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const faction = interaction.options.getString('faction')
    const type = interaction.options.getString('type')
    const card = randomizeCard({ faction, type })
    const id = serialization.card.serialize(card)

    trackBotCommand(interaction, { faction, type })

    // The URL minification could take longer than the 3-second window imposed
    // by Discord so it is best to use a deferred reply.
    await interaction.deferReply({ ephemeral })

    const url = client.SKIP_MINIFICATION
      ? BASE_URL + id
      : await minify(BASE_URL + id)

    return interaction.editReply({ content: url, ephemeral })
  },
}

export default randomcard
