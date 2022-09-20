import { getEntries } from '#helpers/sanity'
import { FIELDS, MAPPER } from './utils.js'

const getGuidesFromCategory = async ({ category, isPreview } = {}) => {
  const guides = await getEntries({
    conditions: ['_type == "guide"', 'category == $category'],
    params: { category },
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return guides.map(MAPPER)
}

export default getGuidesFromCategory
