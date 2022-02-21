import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getDecksWithTag = async tag => {
  const decks = await getEntries({
    conditions: ['_type == "deck"', '$tag in tags'],
    params: { tag },
  })

  return decks.map(clean)
}

export default getDecksWithTag
