import { RARITIES } from '~/constants/game'
import arrayPad from '~/helpers/arrayPad'

const count = RARITIES.length

const base = index =>
  index < count
    ? [index]
    : base(Math.floor(index / count)).concat(index % count)

// Generate a drawing sequence of length `draws` for given index
// @param {Number} draws - Amount of draws in a book
// @return {Number[]} Drawing sequence
export const getSequence = (index, draws) => arrayPad(base(index), draws, 0)

const getDrawingSequences = draws =>
  Array.from({ length: count ** draws }, (_, i) => getSequence(i, draws))

export default getDrawingSequences
