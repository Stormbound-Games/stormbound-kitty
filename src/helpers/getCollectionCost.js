import { RARITY_COPIES } from '../constants/game'
import resolveCardForLevel from './resolveCardForLevel'

const sum = (a, b) => a + b

export const getCardCost = card => {
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
    case 1: {
      return craftingCost + card.copies * stonesPerCopy
    }

    // If the card is level 2, its total value is its crafting cost + the amount
    // of copies to get to level 2 times the value of a copy + the amount of
    // extra copies times the value of a copy.
    case 2: {
      const copies = levelCopies[0] + card.copies

      return craftingCost + copies * stonesPerCopy
    }

    // If the card is level 3, its total value is its crafting cost + the amount
    // of copies to get to level 3 + the amount of extra copies times the value
    // of a copy.
    case 3: {
      const copies = levelCopies[0] + levelCopies[1] + card.copies

      return craftingCost + copies * stonesPerCopy
    }

    // If the card is level 4, its total value is its crafting cost + the amount
    // of copies to get to level 4 + the amount of extra copies times the value
    // of a copy.
    case 4: {
      const copies =
        levelCopies[0] + levelCopies[1] + levelCopies[2] + card.copies

      return craftingCost + copies * stonesPerCopy
    }

    // If the card is level 5, its total value is its crafting cost + the
    // amount of copies to get to level 5 times the value of a copy + the
    // amount of extra copies times the value of an extra copy past level 5.
    case 5: {
      const copies =
        levelCopies[0] + levelCopies[1] + levelCopies[2] + levelCopies[3]

      return (
        craftingCost + copies * stonesPerCopy + card.copies * stonesPerExtraCopy
      )
    }

    default:
      return 0
  }
}

export default collection => {
  return collection.map(getCardCost).reduce(sum, 0)
}
