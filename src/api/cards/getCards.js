import { getEntries } from '~/helpers/sanity'
import sortCards from '~/helpers/sortCards'
import { FIELDS, MAPPER } from './utils'

const getCards = async ({ isPreview, fields = FIELDS } = {}) => {
  const cards = await getEntries({
    conditions: ['_type == "card"'],
    fields,
    options: { order: 'faction desc, name asc', isPreview },
  })

  return cards.map(MAPPER).sort(sortCards())
}

export default getCards
