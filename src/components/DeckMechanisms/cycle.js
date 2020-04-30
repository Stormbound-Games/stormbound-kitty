import getIncreasedDeckWeight from './getIncreasedDeckWeight'
import rwcDuplicates from '../../helpers/rwcDuplicates'
import isCard from '../../helpers/isCard'

export const DEFAULT_CYCLE_OPTIONS = { countAsCycled: true }

/**
 * Mutate the given state following a cycle.
 * @param {Object} state - State being mutated
 * @param {Object} card - Object containing id and idx of the cycled card
 * @param {Object} options - Cycling options
 * @param {Boolean} [options.countAsCycled = true] - Whether it counts as this turn’s cycle
 * @return {Object} Mutated state
 */
const cycle = (state, card, options = DEFAULT_CYCLE_OPTIONS) => {
  // Remove the cycled card from the hand.
  state.hand = state.hand.filter(cardInHand => !isCard(card)(cardInHand))

  // The available cards for cycle are all the ones that are not currently
  // in the hand, and that are not the one that has been cycled. From there,
  // we can draw a random card while taking weight into account, then push
  // the new card into the hand.
  const availableCards = state.deck.filter(
    cardInDeck =>
      !state.hand.find(isCard(cardInDeck)) && !isCard(card)(cardInDeck)
  )

  const pick = rwcDuplicates(availableCards)
  state.hand.push(pick)

  // After having drawn a new card, we need to readjust the weight of all
  // cards that are not in the hand, as well as the one that has just been
  // drawn (reset to 0).
  state.deck = getIncreasedDeckWeight({
    deck: state.deck,
    hand: state.hand,
    reset: [card, pick],
  })

  // Goldgrubbers’ and Snake Eyes’ abilities should not
  // be counted as cycling, since they only replace the cards
  state.hasCycledThisTurn = options.countAsCycled

  return state
}

export default cycle
