import getStoriesForSearch from '../../helpers/getStoriesForSearch'
import arrayRandom from '../../helpers/arrayRandom'
import stories from '../../../public/stories'

export default search => {
  if (search === 'random' || search === '') {
    return 'https://stormbound-kitty.com/stories/' + arrayRandom(stories).id
  }

  const results = getStoriesForSearch(search)

  if (results.length === 0) return

  return results
    .slice(0, 2)
    .map(story => 'https://stormbound-kitty.com/stories/' + story.id)
    .join('\n')
}
