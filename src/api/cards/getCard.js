import { getEntry } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getCard = async ({ id, isPreview } = {}) => {
  const card = await getEntry({
    conditions: ['_type == "card"', 'id match $id'],
    fields: FIELDS,
    params: { id },
    options: { isPreview },
  })

  return card ? MAPPER(card) : null
}

export default getCard
