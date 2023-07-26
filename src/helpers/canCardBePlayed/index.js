import { PROBABILITIES } from '#constants/dryRunner'

const DEFAULT_STATE = {
  frozenEnemies: false,
  noUnits: false,
  turn: Infinity,
  emptyCells: true,
  modifier: 'NONE',
}

const canCardBePlayed = (availableMana, card, state = {}) => {
  state = { ...DEFAULT_STATE, ...state }

  if (!card.id) return false

  // Turn 1 assumes there are no enemies, since this is the first turn of the
  // game.
  if (state.turn === 1) {
    // If the board is full no units/structures can be played. Spells that spawn
    // units can still be played, they simply don’t spawn anything.
    if (!state.emptyCells && card.type !== 'spell') {
      return false
    }

    // There are plenty of spells like Fortification Tonic, Awakening of the
    // Will, Hunter’s Vengeance or Quakefall of the Skies which are considered
    // playable despite not doing anything, just for the sake of cycling through
    // the deck.

    // Confinement, Unhealthy Hysteria, Broken Truce, Icicle Burst, Toxic
    // Sacrifice and Demotivating Strike cannot be played on turn 1 since they
    // require an enemy target. The last two can technically be played on a
    // friendly unit as well but why would you?
    if (['N9', 'N63', 'S10', 'W1', 'F4', 'N94'].includes(card.id)) {
      return false
    }

    // Catnip’s Charm can be played on any unit, friend or foe, but it does
    // require a unit on the board to be played. Stream of Consciousness require
    // a friendly ancient.
    if (['N100', 'N105'].includes(card.id) && state.noUnits) {
      return false
    }

    if (state.modifier === 'SPELL_MANA') {
      // Moment’s Peace, Blessed with Brawn, Boosting Elixir, Kindred’s Grace,
      // Potion of Growth and Final Sacrifice become cheap enough to be played
      // on the first turn (some as the 2nd player) in the `SPELL_MANA` Brawl
      // but they require a friendly unit on the board to be played.
      if (
        ['W6', 'W14', 'I11', 'N40', 'N15', 'N98'].includes(card.id) &&
        state.noUnits
      ) {
        return false
      }

      // Execution, Flaming Stream, Marked as Prey, Curse of Strings become
      // cheap enough to be played on the first turn in the `SPELL_MANA` Brawl
      // but they require an enemy unit, which there is none in turn 1.
      if (['N21', 'I18', 'F11', 'F22'].includes(card.id)) {
        return false
      }
    }
  }

  // Temple of Space can be played for 1 mana if there is an existing friendly
  // Temple of Space on the board. This requires enough turns to have passed for
  // a first Temple of Space to have been played, and then a friendly RNG.
  const isToS = card.id === 'I29'
  const hasPossibleToS = state.mana > card.mana
  const hasToS =
    state.RNG === 'FRIENDLY' ||
    (state.RNG === 'REGULAR' &&
      Math.random() <= PROBABILITIES.CHEAP_TEMPLE_OF_SPACE)

  if (isToS && hasPossibleToS && hasToS) {
    return 2 <= availableMana
  }

  return card.mana <= availableMana
}

export default canCardBePlayed
