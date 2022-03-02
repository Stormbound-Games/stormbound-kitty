import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getReleases = async ({ isPreview, limit } = {}) => {
  const releases = await getEntries({
    conditions: ['_type == "release"'],
    fields: FIELDS,
    options: {
      order: 'date desc',
      slice: limit ? `0...${limit}` : undefined,
      isPreview,
    },
  })

  return releases.map(MAPPER)
}

export default getReleases
