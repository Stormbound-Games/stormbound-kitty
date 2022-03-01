import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getGuides = async ({ isPreview } = {}) => {
  const guides = await getEntries({
    conditions: ['_type == "guide"'],
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return guides.map(MAPPER)
}

export default getGuides
