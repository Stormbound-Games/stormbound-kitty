import getBinomialRandomVariableResult from '~/helpers/getBinomialRandomVariableResult'
import { PROBABILITIES } from '~/constants/dryRunner'

// Mutate the given state to handle the RNG for Frozen Core and Dawnsparks.
// If the RNG is:
// - unfriendly: Frozen Cores and Dawsparks always get destroyed
// - friendly: no Frozen Cores and Dawsparks get destroyed and all; Dawnsparks
//   hit an enemy unit, giving 4 mana each
// - regular: each Frozen Core has a 50% chance of staying on the board (given
//   by FROZEN_CORE_STAYS) and Dawnsparks units each have a 71% chance of
//   staying on the board (given by DAWNSPARKS_STAYS), followed by a 71% chance
//   of hitting an enemy unit (given by DAWSPARKS_HITS) giving 4 mana.
// @param {Object} state - State being mutated
// @return {Object} Mutated state
const resolveManaRNG = state => {
  // Regardless of the RNG setting, we need to reduce the amount of Orgone
  // Leechers as they eventually either die or reach the base.
  state.specifics.activeOrgoneLeechers -= getBinomialRandomVariableResult(
    state.specifics.activeOrgoneLeechers,
    PROBABILITIES.ORGONE_LEECHERS_STAYS
  )

  switch (state.RNG) {
    case 'UNFRIENDLY': {
      state.specifics.activeFrozenCores = 0
      state.specifics.activeDawnsparks = 0

      // When RNG is unfriendly, we expect the opponent player to destroy all
      // other ancients but the Orgone Leechers so they leech a maximum amount
      // of mana.
      state.specifics.activeFriendlyAncients = 0
      state.mana -= Math.min(3 * state.specifics.activeOrgoneLeechers)
      break
    }

    case 'REGULAR': {
      // Choose how many Frozen Cores survive
      state.specifics.activeFrozenCores = getBinomialRandomVariableResult(
        state.specifics.activeFrozenCores,
        PROBABILITIES.FROZEN_CORE_STAYS
      )

      // Choose how many Dawnsparks units survive
      state.specifics.activeDawnsparks = getBinomialRandomVariableResult(
        state.specifics.activeDawnsparks,
        PROBABILITIES.DAWNSPARKS_STAYS
      )

      // Choose how many friendly ancients survive (for Orgone Leechers)
      state.specifics.activeFriendlyAncients -= getBinomialRandomVariableResult(
        state.specifics.activeFriendlyAncients,
        PROBABILITIES.ANCIENT_STAYS
      )

      // Add mana from remaining Frozen Cores
      state.mana += state.specifics.activeFrozenCores * 3

      // Choose how many Dawnspark units hit and add mana to total
      state.mana +=
        getBinomialRandomVariableResult(
          state.specifics.activeDawnsparks,
          PROBABILITIES.DAWNSPARKS_HITS
        ) * 4

      // Decrease mana based on the amount of active friendly ancients.
      state.mana -= Math.max(
        (3 - state.specifics.activeFriendlyAncients) *
          state.specifics.activeOrgoneLeechers,
        0
      )
      break
    }

    case 'FRIENDLY':
    default: {
      state.mana += state.specifics.activeFrozenCores * 3
      state.mana += state.specifics.activeDawnsparks * 4
      state.mana -= Math.max(
        (3 - state.specifics.activeFriendlyAncients) *
          state.specifics.activeOrgoneLeechers,
        0
      )
      break
    }
  }

  // Make sure mana never goes negative.
  if (state.mana < 0) state.mana = 0

  return state
}

export default resolveManaRNG
