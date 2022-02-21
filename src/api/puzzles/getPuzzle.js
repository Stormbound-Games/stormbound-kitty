import { getEntry } from '~/helpers/sanity'
import clean from './clean'

const getPuzzle = async board => {
  const puzzle = await getEntry({
    conditions: ['_type == "puzzle"', 'board == $board'],
    params: { board },
  })

  return puzzle ? clean(puzzle) : null
}

export default getPuzzle
