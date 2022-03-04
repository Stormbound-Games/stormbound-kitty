import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getBooks = async ({ isPreview } = {}) => {
  const books = await getEntries({
    conditions: ['_type == "book"'],
    fields: FIELDS,
    options: { order: 'order asc', isPreview },
  })

  return books.map(MAPPER)
}

export default getBooks
