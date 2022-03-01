import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getSWCCFromCard = async ({ id, isPreview } = {}) => {
  const seasons = await getEntries({
    conditions: ['_type == "swcc"', 'count(weeks[winner.id == $id]) > 0'],
    fields: `weeks[winner.id == $id] { ${FIELDS} }`,
    params: { id },
    options: { isPreview },
  })

  return seasons.map(MAPPER).pop().weeks.pop() || null
}

export default getSWCCFromCard
