import { RARITY_COPIES } from '~/constants/game'
import getResolvedCardData from '~/helpers/getResolvedCardData'

const sum = (a, b) => a + b

export const getCardCost = (cardsIndex, card) => {
  // If the card is missing, it has no value.
  if (card.missing) return 0
  const { rarity } = getResolvedCardData(cardsIndex, card)
  const {
    copies: levelCopies,
    stonesForMissing: craftingCost,
    stonesPerMissingCopy: stonesPerCopy,
  } = RARITY_COPIES[rarity]
  // If the card is level 3 (for example), it represents copies equal to the
  // current unused copies added to those needed to bring it to level 3,
  // stored in levelCopies[0] (1 to 2) and levelCopies[1] (2 to 3)
  const conditionalSum = (acc, levelCop, index) =>
    index < card.level - 1 ? acc + levelCop : acc
  const copies = card.copies + levelCopies.reduce(conditionalSum, 0)
  // Copies that could be exchanged for coins do not count towards the
  // fusion stones value of the card
  const maxCopies = levelCopies.reduce(sum, 0)

  return craftingCost + Math.min(copies, maxCopies) * stonesPerCopy
}

const getCollectionCost = (cardsIndex, collection) => {
  return collection.map(card => getCardCost(cardsIndex, card)).reduce(sum, 0)
}

export default getCollectionCost
