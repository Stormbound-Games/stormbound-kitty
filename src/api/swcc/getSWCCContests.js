import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getSWCCContests = async ({ isPreview } = {}) => {
  const contests = await getEntries({
    conditions: ['_type == "SWCC"'],
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return contests.map(MAPPER)
}

export default getSWCCContests
