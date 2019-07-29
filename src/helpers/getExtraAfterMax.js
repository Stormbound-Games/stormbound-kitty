import { RARITY_COPIES } from '../constants/game'
import getCostForLevel from './getCostForLevel'

export default ({ rarity, level, copies }) => {
  const costForMax = getCostForLevel(5)({ rarity, level, copies })

  if (costForMax.copies > 0) {
    return { copies: 0, stones: 0 }
  }

  return {
    copies: costForMax.extraCopies,
    stones: costForMax.extraCopies * RARITY_COPIES[rarity].stonesPerExtraCopy
  }
}
