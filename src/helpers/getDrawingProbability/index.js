import { RARITIES } from '~/constants/game'
import { BOOKS } from '~/constants/books'
import countCards from '~/helpers/countCards'
import getDrawingSequences from '~/helpers/getDrawingSequences'

/**
 * Get the probability of pulling the given sequence
 * @param {String} bookType - Type of book (e.g. `MYTHIC`)
 * @param {Number[]} expectations - Expectations as rarity array
 * @param {Number[]} sequence - Drawing sequence
 * @return {Float} Probability between 0 and 1
 */
export const getSequenceProbability = (cards, book, expectations) => {
  const { draws, percentiles, only } = book
  const cardCounts = Object.keys(RARITIES).map(rarity =>
    countCards(cards, { ...only, rarity })
  )

  return sequence => {
    const pools = cardCounts.slice(0)
    let probability = 1

    for (let i = 0; i < draws; i++) {
      const rarity = sequence[i]
      if (pools[rarity] === 0) return 0
      probability *= percentiles[rarity]
      probability *= (pools[rarity] - expectations[rarity]) / pools[rarity]
      pools[rarity] -= 1
    }

    return probability
  }
}

/**
 * Get the drawing probability of the given exceptations in the given book type
 * @param {String} bookType - Type of book (e.g. `MYTHIC`)
 * @param {Number[]} expectations - Expectations as rarity array
 * @return {Float} Probability between 0 and 1
 */
const getDrawingProbability = (cards, bookType, expectations) => {
  const { draws, percentiles } = BOOKS[bookType]

  // If an expected card is from a rarity that cannot be found in the given book
  // (e.g. a common card in a Mythic Tome), set this rarity expectation to 0
  expectations = expectations.map((expectation, index) =>
    percentiles[index] === 0 ? 0 : expectation
  )

  // If there are no expectations (either because there were none to begin with
  // or because the expectations did not match the book type capabilities),
  // return early with a null probability
  if (
    expectations.every(expectation => expectation === 0) ||
    percentiles.some(
      (percentile, index) => percentile === 0 && expectations[index] !== 0
    )
  ) {
    return 0
  }

  const getProbability = getSequenceProbability(
    cards,
    BOOKS[bookType],
    expectations
  )
  const sequences = getDrawingSequences(draws)

  return 1 - sequences.map(getProbability).reduce((a, b) => a + b, 0)
}

export default getDrawingProbability
