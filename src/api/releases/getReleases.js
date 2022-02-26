import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getReleases = async ({ isPreview } = {}) => {
  const releases = await getEntries({
    conditions: ['_type == "release"'],
    options: { order: 'date desc', isPreview },
  })

  return releases.map(clean)
}

export default getReleases
