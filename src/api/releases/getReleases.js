import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getReleases = async ({ isPreview } = {}) => {
  const releases = await getEntries({
    conditions: ['_type == "release"'],
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return releases.map(MAPPER)
}

export default getReleases
