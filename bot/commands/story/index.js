import { SlashCommandBuilder } from 'discord.js'
import getStoriesForSearch from '#helpers/getStoriesForSearch'
import arrayRandom from '#helpers/arrayRandom'
import getEmbed from '#helpers/getEmbed'
import trackBotCommand from '#helpers/trackBotCommand'
import getStories from '#api/stories/getStories'

const BASE_URL = 'https://stormbound-kitty.com/stories/'

const story = {
  data: new SlashCommandBuilder()
    .setName('story')
    .setDescription('Link a story published on Stormbound-Kitty.')
    .addStringOption(option =>
      option
        .setName('input')
        .setDescription('An abbreviation, ID, or approximate card name.')
    ),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const input = interaction.options.getString('input')

    trackBotCommand(interaction, { input })

    if (input === 'random' || !input) {
      const stories = await getStories()
      const story = arrayRandom(stories)

      return interaction.reply({ content: BASE_URL + story.slug, ephemeral })
    }

    const cards = [...client.cards.values()]
    const results = await getStoriesForSearch(cards, input)

    if (results.length === 0) {
      const embed = getEmbed()
        .setTitle('📝 Story')
        .setDescription(`Could not find a story matching “${input}”.`)
        .setURL('https://stormbound-kitty.com/stories')

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    return interaction.reply({ content: BASE_URL + results[0].slug, ephemeral })
  },
}

export default story
