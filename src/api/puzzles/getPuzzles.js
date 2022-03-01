import { getEntries } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getPuzzles = async ({ isPreview } = {}) => {
  const puzzles = await getEntries({
    conditions: ['_type == "puzzle"'],
    fields: FIELDS,
    options: { order: 'date desc', isPreview },
  })

  return puzzles.map(MAPPER)
}

export default getPuzzles
