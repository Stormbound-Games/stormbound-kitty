import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getStoriesFromCategory = async category => {
  const stories = await getEntries({
    conditions: ['_type == "story"', 'category == $category'],
    params: { category },
  })

  return stories.map(clean)
}

export default getStoriesFromCategory
