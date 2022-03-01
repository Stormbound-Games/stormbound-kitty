import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getStoriesFromCategory = async ({ category, isPreview } = {}) => {
  const stories = await getEntries({
    conditions: ['_type == "story"', 'category == $category'],
    params: { category },
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return stories.map(MAPPER)
}

export default getStoriesFromCategory
