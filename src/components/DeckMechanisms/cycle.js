import rwc from 'random-weighted-choice'
import clone from 'lodash.clonedeep'
import { getIncreasedDeckWeight } from './utils'

const cycle = (id, countAsCycled = true) => state => {
  const newState = clone(state)

  // Remove the cycled card from the hand.
  newState.hand = state.hand.filter(cardId => cardId !== id)

  // The available cards for cycle are all the ones that are not currently
  // in the hand, and that are not the one that has been cycled. From there,
  // we can draw a random card while taking weight into account, then push
  // the new card into the hand.
  const availableCards = state.deck.filter(
    card => !state.hand.includes(card.id)
  )
  const pick = rwc(availableCards)
  newState.hand.push(pick)

  // After having drawn a new card, we need to readjust the weight of all
  // cards that are not in the hand, as well as the one that has just been
  // drawn (reset to 0).
  newState.deck = getIncreasedDeckWeight({
    state: newState,
    reset: [id, pick],
  })

  // Goldgrubbers’ and Snake Eyes’ abilities should not
  // be counted as cycling, since they only replace the cards
  newState.hasCycledThisTurn = countAsCycled

  return newState
}

export default cycle
