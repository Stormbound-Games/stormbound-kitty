import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getChangesFromCard = async ({ id, isPreview } = {}) => {
  const changes = await getEntries({
    conditions: ['_type == "changelog"', 'card->id == $id'],
    params: { id },
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return changes.map(MAPPER)
}

export default getChangesFromCard
