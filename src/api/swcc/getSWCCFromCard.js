import { getEntry } from '#helpers/sanity'
import { FIELDS, MAPPER } from './utils.js'

const getSWCCFromCard = async ({ id, isPreview } = {}) => {
  const card = await getEntry({
    conditions: ['_type == "SWCC"', 'id == $id'],
    fields: FIELDS,
    params: { id },
    options: { isPreview },
  })

  return card ? MAPPER(card) : null
}

export default getSWCCFromCard
