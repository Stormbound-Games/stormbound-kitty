import getIncreasedDeckWeight from './getIncreasedDeckWeight'
import rwcDuplicates from '../../helpers/rwcDuplicates'
import isCard from '../../helpers/isCard'

/**
 * Mutate the given state following a draw.
 * @param {Object} state - State being mutated
 * @param {DRCard} [card = null] - Drawn card (otherwise random)
 * @return {Object} Mutated state
 */
const draw = (state, card = null) => {
  // The available cards for draw are all the ones that are not currently
  // in the hand.
  const availableCards = state.deck.filter(
    cardInDeck => !state.hand.find(isCard(cardInDeck))
  )

  // Draw a random card while taking weight into account.
  const pick = card || rwcDuplicates(availableCards)

  // Put the new card into the hand.
  state.hand.push(pick)

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
