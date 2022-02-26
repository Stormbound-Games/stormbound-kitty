import { getEntries } from '~/helpers/sanity'
import isCardOfficial from '~/helpers/isCardOfficial'
import clean from './clean'

const getChangesFromCard = async ({ id, isPreview } = {}) => {
  if (!isCardOfficial(id)) return []

  const changes = await getEntries({
    conditions: ['_type == "changelog"', 'id == $id'],
    params: { id },
    options: { order: 'date desc', isPreview },
  })

  return changes.map(clean)
}

export default getChangesFromCard
