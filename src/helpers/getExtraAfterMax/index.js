import { RARITY_COPIES } from '~/constants/game'
import getCostForLevel from '~/helpers/getCostForLevel'

const getExtraAfterMax = ({ rarity, level, copies }) => {
  const costForMax = getCostForLevel(5)({ rarity, level, copies })

  if (costForMax.copies > 0) {
    return { copies: 0, stones: 0, coins: 0 }
  }

  return {
    copies: costForMax.extraCopies,
    coins: costForMax.extraCopies * RARITY_COPIES[rarity].coinsPerExtraCopy,
  }
}

export default getExtraAfterMax
