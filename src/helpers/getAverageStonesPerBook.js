import getDrawingProbability from './getDrawingProbability'

const RARITY_STONES = {
  COMMON: 5,
  RARE: 12,
  EPIC: 25,
  LEGENDARY: 50,
}

const getAverageStonesPerBook = bookType =>
  Object.keys(RARITY_STONES).reduce(
    (total, rarity) =>
      total + getDrawingProbability(bookType, rarity) * RARITY_STONES[rarity],
    0
  )

export default getAverageStonesPerBook
