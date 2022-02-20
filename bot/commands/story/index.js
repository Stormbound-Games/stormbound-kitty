import getStoriesForSearch from '~/helpers/getStoriesForSearch'
import getEmbed from '~/helpers/getEmbed'
import getRawCardData from '~/helpers/getRawCardData'
import arrayRandom from '~/helpers/arrayRandom'
import getStories from '~/api/stories/getStories'

const getEmbedForStory = (label, story) => {
  return getEmbed()
    .setTitle(`${label}: ${story.title}`)
    .setURL('https://stormbound-kitty.com/stories/' + story.id)
    .addFields(
      { name: 'Author', value: story.author, inline: true },
      { name: 'Card', value: getRawCardData(story.cardId).name, inline: true }
    )
    .setDescription(story.content.replace(/\n/g, ' '))
}

const story = {
  command: 'story',
  label: '📝  Story',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/stories')
      .setDescription(
        `Link a random story published on Stormbound-Kitty. It optionally accepts a card abbreviation, a Stormbound-Kitty ID, or otherwise performs a “fuzzy search” on the card name to find an associated story. For instance, \`!${this.command} mia\`.`
      )
  },
  handler: async function (message) {
    const stories = await getStories()

    if (message === 'random' || message === '') {
      return getEmbedForStory(this.label, arrayRandom(stories))
    }

    const results = await getStoriesForSearch(message)

    return getEmbedForStory(this.label, results[0])
  },
}

export default story
