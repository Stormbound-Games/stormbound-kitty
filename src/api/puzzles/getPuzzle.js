import { getEntry } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getPuzzle = async ({ id, isPreview } = {}) => {
  const puzzle = await getEntry({
    conditions: ['_type == "puzzle"', 'board == $id'],
    fields: FIELDS,
    params: { id },
    options: { isPreview },
  })

  return puzzle ? MAPPER(puzzle) : null
}

export default getPuzzle
