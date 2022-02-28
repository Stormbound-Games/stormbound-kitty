import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getChangesFromCard = async ({ id, isPreview } = {}) => {
  const changes = await getEntries({
    conditions: ['_type == "changelog"', 'id == $id'],
    params: { id },
    fields: `..., card -> { id }`,
    options: { order: 'date desc', isPreview },
  })

  return changes.map(clean)
}

export default getChangesFromCard
