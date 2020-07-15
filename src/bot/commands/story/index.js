import Discord from 'discord.js'
import getStoriesForSearch from '../../../helpers/getStoriesForSearch'
import getRawCardData from '../../../helpers/getRawCardData'
import arrayRandom from '../../../helpers/arrayRandom'
import stories from '../../../../public/stories'

const getEmbedForStory = story => {
  const embed = new Discord.MessageEmbed()

  embed
    .setColor('#D7598B')
    .setTitle(story.title)
    .setURL('https://stormbound-kitty.com/stories/' + story.id)
    .addFields(
      { name: 'Author', value: story.author, inline: true },
      { name: 'Card', value: getRawCardData(story.cardId).name, inline: true }
    )
    .setDescription(story.content.replace('\n', ' '))

  return embed
}

export default {
  command: 'story',
  help: function () {
    const embed = new Discord.MessageEmbed()

    embed
      .setColor('#D7598B')
      .setTitle(`📝  Story help`)
      .setURL('https://stormbound-kitty.com/stories')
      .setDescription(
        `Link a random story published on Stormbound-Kitty. It optionally accepts a card abbreviation, a Stormbound-Kitty ID, or otherwise performs a “fuzzy search” on the card name to find an associated story. For instance, \`!${this.command} mia\`.`
      )

    return embed
  },
  handler: function (message) {
    if (message === 'random' || message === '') {
      return getEmbedForStory(arrayRandom(stories))
    }

    return getEmbedForStory(getStoriesForSearch(message)[0])
  },
}
