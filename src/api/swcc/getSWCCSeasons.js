import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getSWCCSeasons = async ({ isPreview } = {}) => {
  const seasons = await getEntries({
    conditions: ['_type == "swcc"'],
    fields: `_id, number, weeks[] { ${FIELDS} }`,
    options: { order: 'number desc', isPreview },
  })

  return seasons.map(MAPPER)
}

export default getSWCCSeasons
