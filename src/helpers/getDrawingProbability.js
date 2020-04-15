import { RARITIES, BOOKS } from '../constants/game'
import countCardsForRarity from '../helpers/countCardsForRarity'

const rarities = Object.keys(RARITIES).length

const base = index =>
  index < rarities
    ? [index]
    : base(Math.floor(index / rarities)).concat(index % rarities)

/**
 * Pad given array up to a certain length with a certain padding value
 * @param {Array} array - Array to pad
 * @param {Number} length - Desired array length
 * @param {*} padding - Padding value
 * @return Array of expected length
 */
const arrayPad = (array, length, padding) =>
  array.join('').padStart(length, padding).split('').map(Number)

/**
 * Generate a drawing sequence of length `draws` for given index
 * @param {Number} index - Index
 * @param {Number} draws - Amount of draws in a book
 * @return {Number[]} Drawing sequence
 */
const getSequence = (index, draws) => arrayPad(base(index), draws, '0')

/**
 * Get the probability of pulling the given sequence
 * @param {String} bookType - Type of book (e.g. `MYTHIC`)
 * @param {Number[]} expectations - Expectations as rarity array
 * @param {Number[]} sequence - Drawing sequence
 * @return {Float} Probability between 0 and 1
 */
const getProbability = (bookType, expectations) => {
  const cardCounts = Object.keys(RARITIES).map(countCardsForRarity)
  const { draws, percentiles } = BOOKS[bookType]

  return sequence => {
    const pools = cardCounts.slice(0)
    let probability = 1

    for (let i = 0; i < draws; i++) {
      const rarity = sequence[i]
      probability *= percentiles[rarity]
      probability *= (pools[rarity] - expectations[rarity]) / pools[rarity]
      pools[rarity] -= 1
    }

    return probability
  }
}

/**
 * Get the drawing probability of the given target in the given book type
 * @param {String} bookType - Type of book (e.g. `MYTHIC`)
 * @param {Number[]} expectations - Expectations as rarity array
 * @param {String} target - Expected outcome (e.g. `FUSION_STONES` or `EPIC`)
 * @return {Float} Probability between 0 and 1
 */
const getDrawingProbability = (bookType, expectations) => {
  const { draws, percentiles } = BOOKS[bookType]

  // If an expected card is from a rarity that cannot be found in the given book
  // (e.g. a common card in a Mythic book), set this rarity expectation to 0
  expectations = expectations.map((expectation, index) => {
    return percentiles[index] === 0 ? 0 : expectation
  })

  // If there are no expectations (either because there were none to begin with
  // or because the expectations did not match the book type capabilities),
  // return early with a null probability
  if (expectations.every(expectation => expectation === 0)) {
    return 0
  }

  if (
    percentiles.some(
      (percentile, index) => percentile === 0 && expectations[index] !== 0
    )
  ) {
    return 0
  }

  // If the expected rarity cannot be found in the given book type, return a
  // probability of `0`.

  // Generate `length` possible drawing sequences where `length` is the amount
  // of rarities (4) times the number of draws (based on book type).
  const length = rarities ** draws
  const getSequenceProbability = getProbability(bookType, expectations)
  const sequences = Array.from({ length }, (_, i) => getSequence(i, draws))

  return 1 - sequences.map(getSequenceProbability).reduce((a, b) => a + b, 0)
}

export default getDrawingProbability
