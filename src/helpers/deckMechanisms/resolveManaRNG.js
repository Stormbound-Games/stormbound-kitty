import getBinomialRandomVariableResult from '~/helpers/getBinomialRandomVariableResult'
import { PROBABILITIES } from '~/constants/dryRunner'

/**
 * Mutate the given state to handle the RNG for Frozen Core and Dawnsparks.
 * If the RNG is:
 * - unfriendly: Frozen Cores and Dawsparks always get destroyed
 * - friendly: no Frozen Cores and Dawsparks get destroyed and all; Dawnsparks
 *   hit an enemy unit, giving 4 mana each
 * - regular: each Frozen Core has a 50% chance of staying on the board (given
 *   by FROZEN_CORE_STAYS) and Dawnsparks units each have a 71% chance of
 *   staying on the board (given by DAWNSPARKS_STAYS), followed by a 71% chance
 *   of hitting an enemy unit (given by DAWSPARKS_HITS) giving 4 mana.
 * @param {Object} state - State being mutated
 * @return {Object} Mutated state
 */
const resolveManaRNG = state => {
  switch (state.RNG) {
    case 'UNFRIENDLY': {
      state.specifics.activeFrozenCores = 0
      state.specifics.activeDawnsparks = 0
      break
    }

    case 'REGULAR': {
      const { activeFrozenCores, activeDawnsparks } = state.specifics

      // Choose how many Frozen Cores survive
      state.specifics.activeFrozenCores = getBinomialRandomVariableResult(
        activeFrozenCores,
        PROBABILITIES.FROZEN_CORE_STAYS
      )

      // Choose how many Dawnsparks units survive
      state.specifics.activeDawnsparks = getBinomialRandomVariableResult(
        activeDawnsparks,
        PROBABILITIES.DAWNSPARKS_STAYS
      )

      // Add mana from remaining Frozen Cores
      state.mana += state.specifics.activeFrozenCores * 3

      // Choose how many Dawnspark units hit and add mana to total
      state.mana +=
        getBinomialRandomVariableResult(
          state.specifics.activeDawnsparks,
          PROBABILITIES.DAWNSPARKS_HITS
        ) * 4
      break
    }

    case 'FRIENDLY':
    default:
      state.mana += state.specifics.activeFrozenCores * 3
      state.mana += state.specifics.activeDawnsparks * 4
      break
  }

  return state
}

export default resolveManaRNG
