import { SlashCommandBuilder } from 'discord.js'
import getStoriesForSearch from '#helpers/getStoriesForSearch'
import arrayRandom from '#helpers/arrayRandom'
import getStories from '#api/stories/getStories'
import getCards from '#api/cards/getCards'

const story = {
  data: new SlashCommandBuilder()
    .setName('story')
    .setDescription(
      'Link a random story published on Stormbound-Kitty or matching a certain criteria.'
    )
    .addStringOption(option =>
      option
        .setName('input')
        .setDescription(
          'A card abbreviation, a Stormbound-Kitty ID, or otherwise performs a “fuzzy search” on the card name'
        )
    ),

  async execute(interaction) {
    const message = interaction.options.getString('input')

    if (message === 'random' || !message) {
      const stories = await getStories()
      const story = arrayRandom(stories)

      return interaction.reply({
        content: 'https://stormbound-kitty.com/stories/' + story.slug,
        ephemeral: true,
      })
    }

    const cards = await getCards()
    const results = await getStoriesForSearch(cards, message)

    return interaction.reply({
      content: 'https://stormbound-kitty.com/stories/' + results[0].slug,
      ephemeral: true,
    })
  },
}

export default story
