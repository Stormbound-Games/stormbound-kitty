import clone from 'lodash.clonedeep'
import { DEFAULT_MANA } from '../../constants/battle'
import { PROBABILITIES } from '../../constants/dryRunner'
import getBinomialRandomVariableResult from '../../helpers/getBinomialRandomVariableResult'

const resolveManaRNG = state => {
  // Handle the RNG for Frozen Core and Dawnsparks
  //
  // If the RNG is unfriendly to the user, Frozen Cores and Dawsparks always get destroyed
  //
  // If the RNG is friendly to the user, no Frozen Cores and Dawsparks get destroyed and all
  // the Dawnsparks units hit an enemy unit, giving 4 mana each
  //
  // If the RNG is set to regular, each Frozen Core has a 50% chance of staying on the board
  // (given by FROZEN_CORE_STAYS) and Dawnsparks units each have a 71% chance (DAWNSPARKS_STAYS)
  // of staying on the board, followed by a 71% chance (DAWSPARKS_HITS) of hitting an enemy unit,
  // giving 4 mana
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
}

export const endTurn = state => {
  const newState = clone(state)

  // Increment the current turn by 1
  newState.turn += 1

  // Reset the mana to 3 + the current turn
  newState.mana = DEFAULT_MANA + state.turn

  // Reset the cycling state and potential frozen enemies
  newState.hasCycledThisTurn = false
  newState.specifics.frozenEnemiesLevel = 0

  // Reset the variable counting how many cards were played this turn
  newState.cardsThisTurn = 0

  // Resolve mana from Dawnsparks/Frozen Cores
  resolveManaRNG(newState)

  return newState
}

export default endTurn
