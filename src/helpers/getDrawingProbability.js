import cards from '../data/cards'
import { RARITIES as RARITY_MAP, BOOKS } from '../constants/game'

const RARITIES = Object.keys(RARITY_MAP).map(rarity => rarity.toUpperCase())

/**
 * Return the amount of cards of the specified rarity, plus one for the fusion
 * stones slot which exists in every rarity.``
 * @param {String} rarity - One of the four rarities (uppercase)
 * @return {Number}
 */
const countCardsForRarity = rarity =>
  cards.filter(card => card.rarity === rarity).length + 1 /* Fusion Stones */

/**
 * Add 2 numbers and return their sum
 * @param {Number} a - First number
 * @param {Number} b - Second number
 * @return {Number} Sum of a and b
 */
const sum = (a, b) => a + b

/**
 *
 */
const base = index =>
  index < RARITIES.length
    ? [index]
    : base(Math.floor(index / RARITIES.length)).concat(index % RARITIES.length)

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
 * Array of amount of cards (including fusion stones) for each rarity from
 * common up to legendary
 */
const CARD_COUNTS = Object.keys(RARITY_MAP).map(countCardsForRarity)

/**
 * Get the probability of pulling the given sequence
 * @param {String} bookType - Type of book (e.g. `MYTHIC`)
 * @param {String} target - `FUSION_STONES` or a rarity (e.g. `LEGENDARY`)
 * @param {Number[]} sequence - Sequence
 * @return {Float} Probability between 0 and 1
 */
const getProbability = (bookType, target) => sequence => {
  // `draws` is the number of cards in a book (1, 3 or 6)
  // `percentiles` is an array of percent of chances of drawing per rarity
  // like `[0, 0, 70, 30]` starting with common up to legendary
  const { draws, percentiles } = BOOKS[bookType]
  // `pools` is an array of amount of cards per rarity like `[80, 61, 41, 20]`
  // starting with common up to legendary
  const pools = CARD_COUNTS.slice(0)
  let probability = 1

  for (let i = 0; i < draws; i++) {
    // `rarity` is an integer from 0 (common) to 3 (legendary) depicting the
    // card rarity
    const rarity = sequence[i]
    // The division per 100 is required because the percentiles are based on
    // 100 and not 1 (e.g. `70` not `0.7`)
    probability *= percentiles[rarity] / 100

    // If looking for fusion stones, any rarity does the trick are fusion
    // stones exist in all rarities; otherwise, only update the probability if
    // the drawn card’s rarity matches the rarity of the expected card
    if (target === 'FUSION_STONES' || RARITIES.indexOf(target) === rarity) {
      probability *= (pools[rarity] - 1) / pools[rarity]
    }

    pools[rarity] -= 1
  }

  return probability
}

/**
 * Get the drawing probability of the given target in the given book type
 * @param {String} bookType - Type of book (e.g. `MYTHIC`)
 * @param {String} target - Expected outcome (e.g. `FUSION_STONES` or `EPIC`)
 * @return {Float} Probability between 0 and 1
 */
const getDrawingProbability = (bookType, target) => {
  const { draws, percentiles } = BOOKS[bookType]

  // If the expected rarity cannot be found in the given book type, return a
  // probability of `0`.
  if (percentiles[RARITIES.indexOf(target)] === 0) {
    return 0
  }

  // Generate `length` possible drawing sequences where `length` is the amount
  // of rarities (4) times the number of draws (based on book type).
  const length = RARITIES.length ** draws
  const getSequenceProbability = getProbability(bookType, target)
  const sequences = Array.from({ length }, (_, i) => getSequence(i, draws))

  return 1 - sequences.map(getSequenceProbability).reduce(sum, 0)
}

export default getDrawingProbability
