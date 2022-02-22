import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getGuidesFromCategory = async ({ category, isPreview } = {}) => {
  const guides = await getEntries({
    conditions: ['_type == "guide"', 'category == $category'],
    params: { category },
    options: { order: 'date desc', isPreview },
  })

  return guides.map(clean)
}

export default getGuidesFromCategory
