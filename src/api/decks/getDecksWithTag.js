import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getDecksWithTag = async ({ tag, isPreview } = {}) => {
  const decks = await getEntries({
    conditions: ['_type == "deck"', '$tag in tags'],
    fields: FIELDS,
    params: { tag },
    options: { order: 'date asc', isPreview },
  })

  return decks.map(MAPPER)
}

export default getDecksWithTag
