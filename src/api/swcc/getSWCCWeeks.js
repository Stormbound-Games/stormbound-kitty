import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getSWCCSeasons = async ({ isPreview } = {}) => {
  const weeks = await getEntries({
    conditions: ['_type == "SWCC"'],
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return weeks.map(MAPPER)
}

export default getSWCCSeasons
