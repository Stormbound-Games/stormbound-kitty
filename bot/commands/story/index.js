import getStoriesForSearch from '~/helpers/getStoriesForSearch'
import getEmbed from '~/helpers/getEmbed'
import arrayRandom from '~/helpers/arrayRandom'
import indexArray from '~/helpers/indexArray'
import getStories from '~/api/stories/getStories'
import getCards from '~/api/stories/getCards'

const getEmbedForStory = (cardsIndex, label, story) => {
  return getEmbed()
    .setTitle(`${label}: ${story.title}`)
    .setURL('https://stormbound-kitty.com/stories/' + story.id)
    .addFields(
      { name: 'Author', value: story.author, inline: true },
      { name: 'Card', value: cardsIndex[story.cardId].name, inline: true }
    )
    .setDescription(story.excerpt.replace(/\n/g, ' '))
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
    const cards = await getCards()
    const cardsIndex = indexArray(cards)

    if (message === 'random' || message === '') {
      const stories = await getStories()
      const story = arrayRandom(stories)

      return getEmbedForStory(cardsIndex, this.label, story)
    }

    const results = await getStoriesForSearch(message)

    return getEmbedForStory(cardsIndex, this.label, results[0])
  },
}

export default story
