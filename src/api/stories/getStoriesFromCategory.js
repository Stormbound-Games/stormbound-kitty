import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getStoriesFromCategory = async ({ category, isPreview } = {}) => {
  const stories = await getEntries({
    conditions: ['_type == "story"', 'category == $category'],
    params: { category },
    fields: `..., cardRef -> { id }`,
    options: { order: 'date desc', isPreview },
  })

  return stories.map(clean)
}

export default getStoriesFromCategory
