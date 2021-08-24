import fs from 'fs'
import path from 'path'
import getStoriesForSearch from '~/helpers/getStoriesForSearch'
import getEmbed from '~/helpers/getEmbed'
import getRawCardData from '~/helpers/getRawCardData'
import arrayRandom from '~/helpers/arrayRandom'

const dir = path.join(process.cwd(), 'src', 'data', 'stories')
const STORIES = fs
  .readdirSync(dir)
  .map(fileName => require('~/data/stories/' + fileName))

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

export default {
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
  handler: function (message) {
    if (message === 'random' || message === '') {
      return getEmbedForStory(this.label, arrayRandom(STORIES))
    }

    return getEmbedForStory(this.label, getStoriesForSearch(message)[0])
  },
}
