import getIncreasedDeckWeight from './getIncreasedDeckWeight'
import rwcDuplicates from '../../helpers/rwcDuplicates'
import areCardsEqual from '../../helpers/areCardsEqual'

/**
 * Mutate the given state following a draw.
 * @param {Object} state - State being mutated
 * @param {Object} [specificCard = null] - Object containing id and idx of the drawn card (if not random)
 * @return {Object} Mutated state
 */
const draw = (state, specificCard = null) => {
  // The available cards for draw are all the ones that are not currently
  // in the hand.
  const availableCards = state.deck.filter(
    card => !state.hand.find(cardInHand => areCardsEqual(cardInHand, card))
  )

  // Draw a random card while taking weight into account.
  const pick = specificCard || rwcDuplicates(availableCards)

  // Put the new card into the hand.
  state.hand.push({ id: pick.id, idx: pick.idx })

  // After having drawn a new card, we need to readjust the weight of all
  // cards that are not in the hand, as well as the card that has just been
  // drawn (reset to 0).
  state.deck = getIncreasedDeckWeight({
    deck: state.deck,
    hand: state.hand,
    reset: [pick],
  })

  return state
}

export default draw
