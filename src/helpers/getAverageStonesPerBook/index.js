import getDrawingProbability from '../getDrawingProbability'
import { PRE_MADE_EXPECTATIONS } from '../../constants/game'

const RARITY_STONES = {
  COMMON: 5,
  RARE: 12,
  EPIC: 25,
  LEGENDARY: 50,
}

const getAverageStonesPerBook = bookType =>
  Object.keys(RARITY_STONES).reduce(
    (total, rarity) =>
      total +
      getDrawingProbability(
        bookType,
        PRE_MADE_EXPECTATIONS['SPECIFIC_' + rarity].expectations
      ) *
        RARITY_STONES[rarity],
    0
  )

export default getAverageStonesPerBook
