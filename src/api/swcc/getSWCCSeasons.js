import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getSWCCSeasons = async ({ isPreview } = {}) => {
  const seasons = await getEntries({
    conditions: ['_type == "swcc"'],
    options: { order: 'number desc', isPreview },
  })

  return seasons.map(clean)
}

export default getSWCCSeasons
