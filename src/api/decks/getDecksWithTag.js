import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getDecksWithTag = async ({ tag, isPreview } = {}) => {
  const decks = await getEntries({
    conditions: ['_type == "deck"', '$tag in tags'],
    params: { tag },
    options: { order: 'date asc', isPreview },
  })

  return decks.map(clean)
}

export default getDecksWithTag
