const DEFAULT_STATE = {
  frozenEnemies: false,
  noUnits: false,
  turn: Infinity,
  emptyCells: true,
}

const canCardBePlayed = (availableMana, card, state = {}) => {
  state = { ...DEFAULT_STATE, ...state }

  if (!card.id) return false

  // This checks if a unit has been frozen this turn to allow Icicle Burst
  // to be played.
  if (card.id === 'W1' && !state.frozenEnemies) {
    return false
  }

  if (state.turn === 1) {
    // If the board is full no units/structures can be played. Spells that spawn
    // units can still be played, they simply don’t spawn anything.
    if (!state.emptyCells && card.type !== 'spell') {
      return false
    }

    // These spells can’t be played on turn 1 since they require a target:
    // Confinement, Unhealthy Hysteria and Broken Truce. Icicle Burst is
    // handled here again because playing Frosthexers on turn 1 should not make
    // Icicle Burst playable either.
    const unplayableSpells = ['N9', 'N63', 'S10', 'W1']

    if (state.noUnits) {
      // Add Toxic Sacrifice to the list of unplayable spells if no unit has
      // been played or spawned on this first turn.
      unplayableSpells.push('F4')
      // Potion of Growth is only playable in `SPELL_MANA` Brawl if there is a
      // unit on the board (1- or 2-drop played before).
      unplayableSpells.push('N15')
      // Moment’s Peace, Boosting Elixir and Kindred’s Grace become cheap enough
      // to be played on the first turn (some as the 2nd player) in the
      // `SPELL_MANA` Brawl but they require a friendly unit on the board to be
      // played.
      unplayableSpells.push('W6')
      unplayableSpells.push('I11')
      unplayableSpells.push('N40')
    }

    if (unplayableSpells.includes(card.id)) return false
  }

  return card.mana <= availableMana
}

export default canCardBePlayed
