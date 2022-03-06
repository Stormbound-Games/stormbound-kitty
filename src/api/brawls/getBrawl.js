import { getEntry } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getBrawl = async ({ slug, isPreview } = {}) => {
  const brawl = await getEntry({
    conditions: ['_type == "brawl"', 'slug.current == $slug'],
    fields: FIELDS,
    params: { slug },
    options: { isPreview },
  })

  return brawl ? MAPPER(brawl) : null
}

export default getBrawl
