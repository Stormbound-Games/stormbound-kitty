import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getGuidesFromAuthor = async ({ author, isPreview } = {}) => {
  const guides = await getEntries({
    conditions: ['_type == "guide"', 'count(authors[lower(@) == $author]) > 0'],
    params: { author },
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return guides.map(MAPPER)
}

export default getGuidesFromAuthor
