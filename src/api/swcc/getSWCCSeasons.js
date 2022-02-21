import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getSWCCSeasons = async () => {
  const seasons = await getEntries({
    conditions: ['_type == "swcc"'],
    options: { order: 'number desc' },
  })

  return seasons.map(clean)
}

export default getSWCCSeasons
