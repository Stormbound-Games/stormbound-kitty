import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getChanges = async ({ isPreview } = {}) => {
  const changes = await getEntries({
    conditions: ['_type == "changelog"'],
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return changes.map(MAPPER)
}

export default getChanges
