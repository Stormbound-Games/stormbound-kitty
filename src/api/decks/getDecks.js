import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getDecks = async () => {
  const ecks = await getEntries({
    conditions: ['_type == "deck"'],
  })

  return ecks.map(clean)
}

export default getDecks
