import { getEntry } from '~/helpers/sanity'
import clean from './clean'

const getPuzzle = async ({ id, isPreview } = {}) => {
  const puzzle = await getEntry({
    conditions: ['_type == "puzzle"', 'board == $id'],
    params: { id },
    options: { isPreview },
  })

  return puzzle ? clean(puzzle) : null
}

export default getPuzzle
