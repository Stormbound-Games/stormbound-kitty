import { RARITY_COPIES } from '~/constants/game'

const isLevelAvailable = (cardsIndex, card, level) => {
  // If the card is missing from the collection, it means there are 0 extra
  // copies which means no level can be highlighted. Similarly, if the card is
  // already level 5, we can short-circuit the function.
  if (card.missing || card.level === 5) return false

  // Begin with all levels not being available, either because they have been
  // reached already, or because we don’t know yet whether they can be.
  const isLevelAvailable = [false, false, false, false, false]
  const { rarity } = cardsIndex[card.id]
  let { copies } = card

  // Go from the current card level (from 1 to 4) to 5, and check if we have
  // enough copies to reach the next missing level; deduct the number of copies
  // used for each level.
  for (let i = card.level; i < 5; i++) {
    let copiesForNextLevel = RARITY_COPIES[rarity].copies[i - 1]

    isLevelAvailable[i] = copies - copiesForNextLevel >= 0
    copies -= copiesForNextLevel
  }

  return isLevelAvailable[level - 1]
}

export default isLevelAvailable
