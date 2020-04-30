import handleCardEffect from './handleCardEffect'
import isCard from '../../helpers/isCard'

export const DEFAULT_PLAY_OPTIONS = {
  mode: 'AUTOMATIC',
  free: false,
  discard: false,
}

/**
 * Mutate the given state following a play.
 * @param {Object} state - State being mutated
 * @param {DRCard} card - Played card (for example {id: 'N1', idx: '0'})
 * @param {Object} options - Play options
 * @param {Boolean} [options.discard = false] - Whether the play is actually a discard
 * @param {Boolean} [options.free = false] - Whether the play is for free
 * @param {String} [options.mode = 'AUTOMATIC'] - Game mode (MANUAL or AUTOMATIC)
 * @return {Object} Mutated state
 */
const play = (state, card, options = DEFAULT_PLAY_OPTIONS) => {
  if (!card) return state

  const cardData = state.deck.find(isCard(card))

  // Remove the played card from the hand
  state.hand = state.hand.filter(cardInHand => !isCard(card)(cardInHand))

  if (options.discard) return state

  // Log card being played
  state.playedCards = [cardData, ...state.playedCards]
  state.cardsThisTurn += 1

  // Unless the play is actually free or a discard, decrease the amount
  // of available mana by the cost the card
  if (!options.free) {
    state.mana -= cardData.mana
  }

  // Check if this card spawns units on the board, this is used to check
  // if Toxic Sacrifice can be played on this turn.
  if (state.turn === 1 && cardData.type === 'unit') {
    state.specifics.noUnitsOnFirstTurn = false
  }

  return handleCardEffect(state, cardData, options.mode)
}

export default play
