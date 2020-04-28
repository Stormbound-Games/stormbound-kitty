import handleCardEffect from './handleCardEffect'

export const DEFAULT_PLAY_OPTIONS = {
  mode: 'AUTOMATIC',
  free: false,
  discard: false,
}

/**
 * Mutate the given state following a play.
 * @param {Object} state - State being mutated
 * @param {String} id - Id of the played card
 * @param {Object} options - Play options
 * @param {Boolean} [options.discard = false] - Whether the play is actually a discard
 * @param {Boolean} [options.free = false] - Whether the play is for free
 * @param {String} [options.mode = 'AUTOMATIC'] - Game mode (MANUAL or AUTOMATIC)
 * @return {Object} Mutated state
 */
const play = (state, id, options = DEFAULT_PLAY_OPTIONS) => {
  const card = state.deck.find(card => card.id === id)
  const canAfford = options.free || card.mana <= state.mana

  // If it’s not a discard move and the card costs more mana than the current
  // round, skip play.
  if (!options.discard && !canAfford) {
    return state
  }

  // Remove the played card from the hand
  state.hand = state.hand.filter(cardId => cardId !== id)

  if (options.discard) return state

  // Log card being played
  state.playedCards = [card, ...state.playedCards]
  state.cardsThisTurn += 1

  // Unless the play is actually free or a discard, decrease the amount
  // of available mana by the cost the card
  if (!options.free) {
    state.mana -= card.mana
  }

  // Check if this card spawns units on the board, this is used to check
  // if Toxic Sacrifice can be played on this turn.
  if (state.turn === 1 && card.type === 'unit') {
    state.specifics.noUnitsOnFirstTurn = false
  }

  return handleCardEffect(state, card, options.mode)
}

export default play
