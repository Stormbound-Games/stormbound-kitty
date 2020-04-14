import cards from '../data/cards'
import { RARITIES } from '../constants/game'

const RARITY_NAMES = Object.keys(RARITIES).map(rarity => rarity.toUpperCase())
const CARD_COUNTS = Object.keys(RARITIES).map(
  rarity => cards.filter(card => card.rarity === rarity).length
)
export const BOOKS = {
  MYTHIC: { percentiles: [0, 0, 70, 30], draws: 6 },
  HEROIC: { percentiles: [0, 70, 25, 5], draws: 6 },
  CLASSIC: { percentiles: [70, 25, 4, 1], draws: 6 },
  NOBLE: { percentiles: [70, 25, 4, 1], draws: 3 },
  ELDER: { percentiles: [0, 67, 30, 3], draws: 1 },
  HUMBLE: { percentiles: [70, 25, 4, 1], draws: 1 },
}

/**
 * @param {String} bookType - Type of book (e.g. `MYTHIC`)
 * @param {String} target - `FUSION_STONES` or a rarity (e.g. `LEGENDARY`)
 * @param {Number[]} sequence - Sequence
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
    if (target === 'FUSION_STONES' || RARITY_NAMES.indexOf(target) === rarity) {
      probability *= pools[rarity] / (pools[rarity] + 1)
    }

    pools[rarity] -= 1
  }

  return probability
}

const sum = (a, b) => a + b

const base = n => (n < 4 ? [n] : [...base(Math.floor(n / 4)), n % 4])

const convert = (n, length) =>
  base(n).join('').padStart(length, '0').split('').map(Number)

const getDrawingProbability = (bookType, target) => {
  if (typeof BOOKS[bookType] === 'undefined') {
    throw new Error('Unknown book type: ' + bookType)
  }

  const { draws, percentiles } = BOOKS[bookType]

  if (percentiles[RARITY_NAMES.indexOf(target)] === 0) {
    return 0
  }

  const getCardProbability = getProbability(bookType, target)
  const sequences = Array.from({ length: 4 ** draws }, (_, index) =>
    convert(index, draws)
  )
  const probabilities = sequences.map(getCardProbability)
  const total = probabilities.reduce(sum, 0)

  return (1 - total) * 100
}

export default getDrawingProbability
