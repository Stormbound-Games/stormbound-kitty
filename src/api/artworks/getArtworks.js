import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getArtworks = async ({ isPreview } = {}) => {
  const artworks = await getEntries({
    conditions: ['_type == "artwork"'],
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return artworks.map(MAPPER)
}

export default getArtworks
