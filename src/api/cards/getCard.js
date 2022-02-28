import { getEntry } from '~/helpers/sanity'
import clean from './clean'

const getCard = async ({ id, isPreview } = {}) => {
  const card = await getEntry({
    conditions: ['_type == "card"', 'id match $id'],
    fields: `..., image { asset -> { ... } }`,
    params: { id },
    options: { isPreview },
  })

  return card ? clean(card) : null
}

export default getCard
