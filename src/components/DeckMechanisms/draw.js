import rwc from 'random-weighted-choice'
import clone from 'lodash.clonedeep'
import { getIncreasedDeckWeight } from './utils'

const draw = specificCardId => state => {
  const newState = clone(state)

  // The available cards for draw are all the ones that are not currently
  // in the hand.
  const isAvailableForDraw = card => !state.hand.includes(card.id)
  const availableCards = state.deck.filter(isAvailableForDraw)

  // Draw a random card while taking weight into account.
  const pick = specificCardId || rwc(availableCards)

  // Put the new card into the hand.
  newState.hand.push(pick)

  // After having drawn a new card, we need to readjust the weight of all
  // cards that are not in the hand, as well as the card that has just been
  // drawn (reset to 0).
  newState.deck = getIncreasedDeckWeight({
    state: newState,
    reset: [pick],
  })

  return newState
}

export default draw
