import { getEntries } from '~/helpers/sanity'
import { FIELDS } from './utils'

const getPages = async ({ isPreview } = {}) => {
  const pages = await getEntries({
    conditions: ['_type == "page"'],
    fields: FIELDS,
    options: { isPreview },
  })

  return pages
}

export default getPages
