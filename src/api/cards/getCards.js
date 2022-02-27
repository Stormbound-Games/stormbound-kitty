import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getCards = async ({ isPreview } = {}) => {
  const cards = await getEntries({
    conditions: ['_type == "card"'],
    fields: `..., image { asset -> { ... } }`,
    options: { order: 'faction desc, name asc', isPreview },
  })

  return cards.map(clean)
}

export default getCards
