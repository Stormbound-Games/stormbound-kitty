import { DEFAULT_MANA } from '~/constants/battle'
import resolveManaRNG from './resolveManaRNG'
import refill from './refill'

export const DEFAULT_END_TURN_OPTIONS = {
  modifier: null,
}

// Mutate the given state following a turn.
// @param {Object} state - State being mutated
// @param {Object} opts - End turn options
// @param {Boolean} [opts.modifier = null] - Active Brawl modifier
// @return {Object} Mutated state
const endTurn = (state, opts) => {
  const options = { ...DEFAULT_END_TURN_OPTIONS, ...opts }

  // Reset the mana to 3 + the current turn, unless the “Reserve Management”
  // Brawl modifier is active, in which case carry the leftover mana over.
  if (options.modifier === 'RESERVE_MANAGEMENT') {
    state.mana += DEFAULT_MANA + state.turn
  } else {
    state.mana = DEFAULT_MANA + state.turn
  }

  // Increment the current turn by 1
  state.turn += 1

  // Reset the cycling state and potential frozen enemies
  state.hasCycledThisTurn = false
  state.specifics.frozenEnemiesLevel = 0

  // Reset the variable counting how many cards were played this turn
  state.cardsThisTurn = 0

  // Resolve mana from Dawnsparks/Frozen Cores
  resolveManaRNG(state)

  // Refill the hand up to 4 cards
  refill(state)

  return state
}

export default endTurn
