import getStoriesForSearch from '../../../helpers/getStoriesForSearch'
import arrayRandom from '../../../helpers/arrayRandom'
import stories from '../../../../public/stories'

export default {
  command: 'story',
  isAllowed: channel => channel.name !== 'trivia',
  help: function () {
    return `📝  **Story Search:** Link a random story published on Stormbound-Kitty. It optionally accepts a card abbreviation, a Stormbound-Kitty ID, or otherwise performs a “fuzzy search” on the card name to find an associated story. For instance, \`!${this.command} mia\`.`
  },
  handler: function (message) {
    if (message === 'random' || message === '') {
      return 'https://stormbound-kitty.com/stories/' + arrayRandom(stories).id
    }

    return getStoriesForSearch(message)
      .slice(0, 2)
      .map(story => 'https://stormbound-kitty.com/stories/' + story.id)
      .join('\n')
  },
}
