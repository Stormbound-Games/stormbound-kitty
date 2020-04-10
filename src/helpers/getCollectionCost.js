import { RARITY_COPIES } from '../constants/game'
import resolveCardForLevel from './resolveCardForLevel'

const sum = (a, b) => a + b

export default collection => {
  return collection
    .map(card => {
      const { rarity } = resolveCardForLevel(card)
      const {
        copies: levelCopies,
        stonesForMissing: craftingCost,
        stonesPerMissingCopy: stonesPerCopy,
        stonesPerExtraCopy,
      } = RARITY_COPIES[rarity]

      // If the card is missing, it has no value.
      if (card.missing) return 0

      switch (card.level) {
        // If the card is level 1, its total value is its crafting cost + the
        // amount of copies times the value of a copy.
        case 1:
          return craftingCost + card.copies * stonesPerCopy
        // If the card is level 2, 3 or 4, its total value is its crafting cost
        // + the amount of copies to get to that level times the value of a copy
        // + the amount of extra copies times the value of a copy.
        case 2:
        case 3:
        case 4:
          return (
            craftingCost +
            levelCopies[card.level - 2] * stonesPerCopy +
            card.copies * stonesPerCopy
          )
        // If the card is level 5, its total value is its crafting cost + the
        // amount of copies to get to level 5 times the value of a copy + the
        // amount of extra copies times the value of an extra copy past level 5.
        case 5:
          return (
            craftingCost +
            levelCopies[3] * stonesPerCopy +
            card.copies * stonesPerExtraCopy
          )
        default:
          return 0
      }
    })
    .reduce(sum, 0)
}
