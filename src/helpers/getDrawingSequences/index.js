import { RARITIES } from '~/constants/game'
import arrayPad from '~/helpers/arrayPad'

const rarities = Object.keys(RARITIES).length

const base = index =>
  index < rarities
    ? [index]
    : base(Math.floor(index / rarities)).concat(index % rarities)

/**
 * Generate a drawing sequence of length `draws` for given index
 * @param {Number} draws - Amount of draws in a book
 * @return {Number[]} Drawing sequence
 */
export const getSequence = (index, draws) => arrayPad(base(index), draws, 0)

const getDrawingSequences = draws =>
  Array.from({ length: rarities ** draws }, (_, i) => getSequence(i, draws))

export default getDrawingSequences
