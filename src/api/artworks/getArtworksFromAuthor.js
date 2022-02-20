import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getArtworksFromAuthor = async author => {
  const artworks = await getEntries({
    conditions: ['_type == "artwork"', 'author match $author'],
    fields: `..., image { asset -> { ... } }`,
    params: { author },
  })

  return artworks.map(clean)
}

export default getArtworksFromAuthor
