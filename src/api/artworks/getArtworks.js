import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getArtworks = async ({ isPreview } = {}) => {
  const artworks = await getEntries({
    conditions: ['_type == "artwork"'],
    fields: `..., image { asset -> { ... } }`,
    options: { isPreview },
  })

  return artworks.map(clean)
}

export default getArtworks
