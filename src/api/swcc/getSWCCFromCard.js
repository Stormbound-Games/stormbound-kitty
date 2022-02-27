import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getSWCCFromCard = async ({ id, isPreview } = {}) => {
  const seasons = await getEntries({
    conditions: ['_type == "swcc"'],
    fields: `number, weeks[winner.id == $id] { ... }`,
    params: { id },
    options: { isPreview },
  })

  return seasons.map(clean).flat().pop() || null
}

export default getSWCCFromCard
