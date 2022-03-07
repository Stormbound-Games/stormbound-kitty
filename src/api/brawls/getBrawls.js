import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getBrawls = async ({ isPreview } = {}) => {
  const books = await getEntries({
    conditions: ['_type == "brawl"'],
    fields: FIELDS,
    options: { isPreview },
  })

  return books.map(MAPPER)
}

export default getBrawls
