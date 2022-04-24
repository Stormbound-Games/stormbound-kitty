import rwcDuplicates from '~/helpers/rwcDuplicates'
import isCard from '~/helpers/isCard'

// Mutate the given state following a draw.
// @param {Object} state - State being mutated
// @param {DRCard?} [card = null] - Drawn card (otherwise random)
// @return {Object} Mutated state
const draw = (state, card = null) => {
  // The available cards for draw are all the ones that are not currently
  // in the hand.
  const availableCards = state.deck.filter(
    cardInDeck => !state.hand.find(isCard(cardInDeck))
  )

  // Draw a random card while taking weight into account.
  const pick = card || rwcDuplicates(availableCards)

  // Put the new card into the hand and reset its weight.
  state.hand.push(pick)
  state.deck.find(isCard(pick)).weight = 0

  return state
}

export default draw
