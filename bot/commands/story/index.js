import { SlashCommandBuilder } from 'discord.js'
import getStoriesForSearch from '#helpers/getStoriesForSearch'
import arrayRandom from '#helpers/arrayRandom'
import getStories from '#api/stories/getStories'

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
    const input = interaction.options.getString('input')

    if (input === 'random' || !input) {
      const stories = await getStories()
      const story = arrayRandom(stories)

      return interaction.reply({
        content: 'https://stormbound-kitty.com/stories/' + story.slug,
        ephemeral: true,
      })
    }

    const cards = [...client.cards.values()]
    const results = await getStoriesForSearch(cards, input)

    return interaction.reply({
      content:
        results.length === 0
          ? `Could not find a story matching “${input}”.`
          : 'https://stormbound-kitty.com/stories/' + results[0].slug,
      ephemeral: true,
    })
  },
}

export default story
