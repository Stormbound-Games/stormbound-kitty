import getIncreasedDeckWeight from '~/helpers/getIncreasedDeckWeight'
import rwcDuplicates from '~/helpers/rwcDuplicates'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import isCard, { isNotCard } from '~/helpers/isCard'

export const DEFAULT_CYCLE_OPTIONS = { countAsCycled: true, modifier: null }

// Mutate the given state following a cycle.
// @param {Object} state - State being mutated
// @param {DRCard} card - Cycled card
// @param {Object} options - Cycling options
// @param {Boolean} [options.countAsCycled = true] - Whether it counts as this turn’s cycle
// @param {Boolean} [options.modifier = null] - Active Brawl modifier
// @return {Object} Mutated state
const cycle = (state, card, opts) => {
  const options = { ...DEFAULT_CYCLE_OPTIONS, ...opts }

  // Remove the cycled card from the hand.
  state.hand = state.hand.filter(isNotCard(card))

  // If the current Brawl modifier is “Steady Growth” and the card is not level
  // 5 yet, increase its level.
  if (options.modifier === 'STEADY_GROWTH' && card.level < 5) {
    state.deck = state.deck.map(deckCard => {
      const isCycledCard = isCard(card)(deckCard)

      if (!isCycledCard) return deckCard

      const leveled = getResolvedCardData(state.cardsIndex, {
        id: card.id,
        level: card.level + 1,
      })

      // Preserve its deck ID in case it’s a copy of another card (Mirz, HoS…).
      leveled.idx = card.idx
      leveled.weight = card.weight

      return leveled
    })
  }

  // The available cards for cycle are all the ones that are not currently
  // in the hand, and that are not the one that has been cycled. From there,
  // we can draw a random card while taking weight into account, then push
  // the new card into the hand.
  const availableCards = state.deck.filter(
    cardInDeck =>
      !state.hand.find(isCard(cardInDeck)) && isNotCard(card)(cardInDeck)
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

  // Goldgrubbers’ and Snake Eyes’ abilities should not be counted as cycling,
  // since they only replace the cards. The condition is important to avoid
  // Goldgrubbers and Snake Eyes to allow cycling again after playing them.
  state.hasCycledThisTurn = state.hasCycledThisTurn || options.countAsCycled

  return state
}

export default cycle
