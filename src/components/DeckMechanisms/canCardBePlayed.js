import isCard from '../../helpers/isCard'

/**
 * Return whether a given card can be played in the current state.
 * @param {Object} state - State being mutated
 * @param {DRCard} card - Card to assess
 * @return {Boolean} Whether the card can be played
 */
const canCardBePlayed = (state, card) => {
  if (!card.id) {
    return false
  }
  const cardData = state.deck.find(isCard(card))
  const isAffordable = cardData.mana <= state.mana

  // This checks if a unit has been frozen this turn to allow Icicle Burst
  // to be played

  // Note: The destroying ability of Wisp Cloud is implemented: Freezing with Frosthexers will
  // make Icicle Burst playable, but playing Wisp Cloud will make it unplayable again
  if (card.id === 'W1' && !state.specifics.frozenEnemiesLevel) {
    return false
  }

  if (state.turn === 1) {
    // If the board is full no units/structures can be played
    // Spells that spawn units can still be played, they simply don't spawn anything
    if (!state.specifics.emptyCellsIndicator && cardData.type !== 'spell') {
      return false
    }

    // These spells can’t be played on turn 1 since they require a target
    // Icicle Burst, Broken Truce, Potion of Growth, Unhealthy Hysteria

    // Note: Checking if there are friendly units on the board to play one of these spells
    // after turn 1 is and should not be implemented, since the opponent can always play
    // Dubious Hags + Toxic Sacrifice to spawn a unit on the first turn
    const unplayableSpells = ['W1', 'S10', 'N15', 'N63']

    // Add Toxic Sacrifice to the list of unplayable spells if no unit has been played
    // or spawned on this first turn
    if (state.specifics.noUnitsOnFirstTurn) {
      unplayableSpells.push('F4')
    }

    if (unplayableSpells.includes(card.id)) return false
  }

  return isAffordable
}

export default canCardBePlayed
