import { getEntries } from '~/helpers/sanity'
import { FIELDS } from './utils'

const getBrawls = async ({ isPreview } = {}) => {
  const books = await getEntries({
    conditions: ['_type == "brawl"'],
    fields: FIELDS,
    options: { isPreview },
  })

  return books
}

export default getBrawls
