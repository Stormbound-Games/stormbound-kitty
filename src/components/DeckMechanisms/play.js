import handleCardEffect from './handleCardEffect'
import findCardDataInDeck from '../../helpers/findCardDataInDeck'

export const DEFAULT_PLAY_OPTIONS = {
  mode: 'AUTOMATIC',
  free: false,
  discard: false,
}

/**
 * Mutate the given state following a play.
 * @param {Object} state - State being mutated
 * @param {Object} card - Object containing id and idx of the played card
 * @param {Object} options - Play options
 * @param {Boolean} [options.discard = false] - Whether the play is actually a discard
 * @param {Boolean} [options.free = false] - Whether the play is for free
 * @param {String} [options.mode = 'AUTOMATIC'] - Game mode (MANUAL or AUTOMATIC)
 * @return {Object} Mutated state
 */
const play = (state, card, options = DEFAULT_PLAY_OPTIONS) => {
  const cardData = findCardDataInDeck(card, state.deck)

  // Remove the played card from the hand
  state.hand = state.hand.filter(
    cardInHand => cardInHand.id !== card.id || cardInHand.idx !== card.idx
  )

  if (options.discard) return state

  // Log card being played (we only need the card id for the card log)
  state.playedCards = [card.id, ...state.playedCards]
  state.cardsThisTurn += 1

  // Unless the play is actually free or a discard, decrease the amount
  // of available mana by the cost the card
  if (!options.free) {
    state.mana -= cardData.mana
  }

  // Check if this card spawns units on the board, this is used to check
  // if Toxic Sacrifice can be played on this turn.
  if (state.turn === 1 && card.type === 'unit') {
    state.specifics.noUnitsOnFirstTurn = false
  }

  return handleCardEffect(state, cardData, options.mode)
}

export default play
