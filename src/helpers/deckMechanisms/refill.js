import draw from './draw'

// Mutate the given state to refill the hand up to 4 cards.
// @param {Object} state - State being mutated
// @return {Object} Mutated state
const refill = state => {
  Array.from({ length: 4 - state.hand.length }, () => draw(state))

  return state
}

export default refill
