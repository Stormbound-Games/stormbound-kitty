import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getArtworksFromAuthor = async ({ author, isPreview } = {}) => {
  const artworks = await getEntries({
    conditions: ['_type == "artwork"', 'author match $author'],
    fields: `..., image { asset -> { ... } }`,
    params: { author },
    options: { isPreview },
  })

  return artworks.map(clean)
}

export default getArtworksFromAuthor
