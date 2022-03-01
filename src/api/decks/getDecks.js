import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getDecks = async ({ isPreview } = {}) => {
  const decks = await getEntries({
    conditions: ['_type == "deck"'],
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return decks.map(MAPPER)
}

export default getDecks
