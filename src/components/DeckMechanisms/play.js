import clone from 'lodash.clonedeep'

// Frozen enemies left after a card's ability has been resolved, in regular RNG mode
const FROZEN_ENEMIES_AFTER = {
  // Frosthexers
  W2: [1, 2, 3, 3, 4],
  // Moment’s Peace
  W6: [2, 3, 3, 4, 4],
  // Midwinter Chaos
  W11: [3, 3, 3, 2, 1],
  // Wisp Cloud
  W4: [0, 0, 0, 1, 2],
}

export const play = (id, options) => state => {
  const card = state.deck.find(card => card.id === id)
  const newState = clone(state)

  // Remove the played card from the hand.
  newState.hand = state.hand.filter(cardId => cardId !== id)

  if (options.discard) {
    return newState
  }

  // Log card being played
  newState.playedCards = [card, ...state.playedCards]
  newState.cardsThisTurn += 1

  // Turn one: Check if board is not full (by Rain of Frogs for example)
  if (state.turn === 1) {
    // Any 3 mana card can be played since it would be the only one to be played
    // and would not fill the board by itself. Collector Mirz creating a 0 mana
    // token is not an issue for board filling.

    // Any 2 mana card will have to be played together with a 1 mana card. This will cause a board filling
    // issue only when this card is Rain of Frogs

    // The remaining playable cards are Green Prototypes, Summon Militia, Toxic Sacrifice and Rain of Frogs
    // In these cases only the emptyCellsIndicator variable represents how many cells are free
    // In the other cases it is not needed and will never be set to 0
    const { emptyCellsIndicator } = newState.specifics

    switch (id) {
      case 'N1':
        // Green Prototypes necessarily advance the frontline (since only the four 1 mana cards are
        // taken into account)
        newState.specifics.emptyCellsIndicator += 4
        break
      case 'N2':
        // Summon Militia won't cause any board filling issues
        newState.specifics.emptyCellsIndicator = Math.max(
          emptyCellsIndicator - 1,
          0
        )
        break
      case 'F4':
        // Toxic Sacrifice frees up at least one cell
        newState.specifics.emptyCellsIndicator += 1
        break
      case 'F8':
        // Rain of Frogs
        const frogs = [4, 5, 5, 6, 6]
        newState.specifics.emptyCellsIndicator = Math.max(
          emptyCellsIndicator - frogs[card.level - 1],
          0
        )
        break
      default:
        // All the other cards don’t have an effect on board filling
        break
    }
  }

  switch (id) {
    case 'W9':
      // If the card played is a Frozen Core, increment the amount of active
      // Frozen Cores by 1.
      newState.specifics.activeFrozenCores += 1
      break
    case 'W16':
      newState.specifics.activeDawnsparks += 1
      break
    case 'W1':
      // Icicle Burst should destroy the frozen enemy unit if there is only one on the board
      if (state.specifics.frozenEnemiesLevel === 1) {
        newState.specifics.frozenEnemiesLevel = 0
      }
      break
    case 'W2':
    case 'W6':
    case 'W11':
    case 'W4':
      // Find how many frozen enemies there are on the board
      // This is not a precise number but gives an approximation
      // (one, a few, many, all) of this amount
      // Based on this approximation and the card that has just
      // been played, store how many frozen enemies stayed on the board

      // For example, playing Midwinter Chaos (W11) will freeze a lot of units,
      // but if there are already many frozen units on the board, it will generally destroy them
      const frozenEnemiesNowRegular =
        FROZEN_ENEMIES_AFTER[id][state.specifics.frozenEnemiesLevel]

      // If the RNG is friendly to the user, the enemy units were spawned  in such a way
      // that an additional unit gets frozen every time a freezing card is played
      if (state.RNG === 'FRIENDLY') {
        newState.specifics.frozenEnemiesLevel = Math.min(
          frozenEnemiesNowRegular + 1,
          4
        )
      }
      // If the RNG is unfriendly to the user, the opposite happens: Freezing cards are not as
      // efficient and less enemy units get frozen
      else if (state.RNG === 'UNFRIENDLY') {
        newState.specifics.frozenEnemiesLevel = Math.max(
          frozenEnemiesNowRegular - 1,
          0
        )
      }
      // In the regular case, just store the new approximation in the specifics.frozenEnemiesLevel
      // variable
      else {
        newState.specifics.frozenEnemiesLevel = frozenEnemiesNowRegular
      }
      break
    default:
      break
  }

  // Unless the play is actually free or a discard, decrease the amount
  // of available mana by the cost the card
  if (!(options.free || options.discard)) {
    newState.mana -= card.mana
  }

  if (state.turn === 1) {
    // Check if this card spawns units on the board, this is used to check if
    // Toxic Sacrifice can be played on this turn
    const unitSpawningSpells = ['N2', 'S24', 'F8']
    // Summon Militia, Head Start (can't occur in the game) and Rain of Frogs

    if (card.type === 'unit' || unitSpawningSpells.includes(id)) {
      newState.specifics.noUnitsOnFirstTurn = false
    }
  }

  return newState
}

export default play
