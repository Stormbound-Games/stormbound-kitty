import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getDecksFromAuthor = async ({ author, isPreview } = {}) => {
  const decks = await getEntries({
    conditions: ['_type == "deck"', 'author match $author'],
    fields: FIELDS,
    params: { author },
    options: { order: 'date desc', isPreview },
  })

  return decks.map(MAPPER)
}

export default getDecksFromAuthor
