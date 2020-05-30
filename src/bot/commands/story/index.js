import getStoriesForSearch from '../../../helpers/getStoriesForSearch'
import arrayRandom from '../../../helpers/arrayRandom'
import stories from '../../../../public/stories'

export default {
  command: 'story',
  name: 'Story search',
  example: 'mia',
  description: 'Get links to stories matching given search criteria',
  icon: '📝',
  handler: function (search) {
    if (search === 'random' || search === '') {
      return 'https://stormbound-kitty.com/stories/' + arrayRandom(stories).id
    }

    return getStoriesForSearch(search)
      .slice(0, 2)
      .map(story => 'https://stormbound-kitty.com/stories/' + story.id)
      .join('\n')
  },
}
