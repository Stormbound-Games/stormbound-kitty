import { getEntries } from '#helpers/sanity'
import { FIELDS, MAPPER } from './utils.js'

const getReleases = async ({ isPreview, fields = FIELDS, limit } = {}) => {
  const releases = await getEntries({
    conditions: ['_type == "release"'],
    fields,
    options: {
      order: 'date desc, _createdAt desc',
      slice: limit ? `0...${limit}` : undefined,
      isPreview,
    },
  })

  return releases.map(MAPPER)
}

export default getReleases
