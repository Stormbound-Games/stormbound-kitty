import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getPages = async ({ isPreview } = {}) => {
  const pages = await getEntries({
    conditions: ['_type == "page"'],
    fields: FIELDS,
    options: { isPreview },
  })

  return pages.map(MAPPER)
}

export default getPages
