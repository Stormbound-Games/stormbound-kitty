import rwc from 'random-weighted-choice'
import getIncreasedDeckWeight from './getIncreasedDeckWeight'

/**
 * Mutate the given state following a draw.
 * @param {Object} state - State being mutated
 * @param {String} [specificCardId = null] - Id of the drawn card (if not random)
 * @return {Object} Mutated state
 */
const draw = (state, specificCardId = null) => {
  // The available cards for draw are all the ones that are not currently
  // in the hand.
  const availableCards = state.deck.filter(
    card => !state.hand.includes(card.id)
  )

  // Draw a random card while taking weight into account.
  const pick = specificCardId || rwc(availableCards)

  // Put the new card into the hand.
  state.hand.push(pick)

  // After having drawn a new card, we need to readjust the weight of all
  // cards that are not in the hand, as well as the card that has just been
  // drawn (reset to 0).
  state.deck = getIncreasedDeckWeight({
    hand: state.hand,
    deck: state.deck,
    reset: [pick],
  })

  return state
}

export default draw
