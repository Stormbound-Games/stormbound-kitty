import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getDecksFromAuthor = async author => {
  const decks = await getEntries({
    conditions: ['_type == "deck"', 'author match $author'],
    params: { author },
  })

  return decks.map(clean)
}

export default getDecksFromAuthor
