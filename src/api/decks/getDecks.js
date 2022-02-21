import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getDecks = async ({ isPreview } = {}) => {
  const ecks = await getEntries({
    conditions: ['_type == "deck"'],
    options: { isPreview },
  })

  return ecks.map(clean)
}

export default getDecks
