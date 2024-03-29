import { getEntry } from '#helpers/sanity'
import { FIELDS, MAPPER } from './utils.js'

const getCard = async ({ id, isPreview } = {}) => {
  const card = await getEntry({
    conditions: ['_type == "card"', 'id.current match $id'],
    fields: FIELDS,
    params: { id },
    options: { isPreview },
  })

  return card ? MAPPER(card) : null
}

export default getCard
