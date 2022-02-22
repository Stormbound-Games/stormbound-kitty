import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getDecksFromAuthor = async ({ author, isPreview } = {}) => {
  const decks = await getEntries({
    conditions: ['_type == "deck"', 'author match $author'],
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return decks.map(clean)
}

export default getDecksFromAuthor
