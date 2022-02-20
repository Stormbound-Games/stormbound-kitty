import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getArtworks = async () => {
  const artworks = await getEntries({
    conditions: ['_type == "artwork"'],
    fields: `..., image { asset -> { ... } }`,
  })

  return artworks.map(clean)
}

export default getArtworks
