import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getArtworksFromAuthor = async ({ author, isPreview } = {}) => {
  const artworks = await getEntries({
    conditions: ['_type == "artwork"', 'author match $author'],
    fields: FIELDS,
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return artworks.map(MAPPER)
}

export default getArtworksFromAuthor
