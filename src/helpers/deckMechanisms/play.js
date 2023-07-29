import handleCardEffect from './handleCardEffect'
import isCard, { isNotCard } from '#helpers/isCard'
import getIncreasedDeckWeight from '#helpers/getIncreasedDeckWeight'
import refill from './refill'

export const DEFAULT_PLAY_OPTIONS = {
  mode: 'AUTOMATIC',
  free: false,
  discard: false,
  reweight: true,
  modifier: null,
}

// Mutate the given state following a play.
// @param {Object} state - State being mutated
// @param {DRCard} card - Played card
// @param {Object} opts - Play options
// @param {Boolean} [opts.discard = false] - Whether the play is actually a discard
// @param {Boolean} [opts.free = false] - Whether the play is for free
// @param {String} [opts.mode = 'AUTOMATIC'] - Game mode (MANUAL or AUTOMATIC)
// @param {String} [opts.reweight = true] - Whether to reweight the deck
// @param {String} [opts.modifier = null] - Active Brawl modifier
// @param {Object} HoS - Reference & Method used to show Harvester’s Dialog
// @return {Object} Mutated state
const play = (state, card, opts, HoS) => {
  const options = { ...DEFAULT_PLAY_OPTIONS, ...opts }

  if (!card) return state

  // Remove the played card from the hand
  state.hand = state.hand.filter(isNotCard(card))

  if (options.discard) return state

  const cardData = state.deck.find(isCard(card))

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
    state.specifics.noFriendlyUnitsOnFirstTurn = false
  }

  // If the card is an Ancient or a Frostling, increment the counter of friendly
  // Orgone Leechers allies on the board. If the card is Orgone Leechers though,
  // we only increment the amount of allies if we have other Orgone Leechers
  // on the board otherwise it counts for itself.
  const isOrgoneLeechers = cardData.id === 'W33'
  const isOrgoneLeechersAlly =
    cardData.unitTypes.includes('ancient') ||
    cardData.unitTypes.includes('frostling')

  if (
    isOrgoneLeechersAlly &&
    (!isOrgoneLeechers || state.specifics.activeOrgoneLeechers > 0)
  ) {
    state.specifics.activeOrgoneLeechersAllies += 1
  }

  // After having played a card, we need to readjust the weight of all cards
  // that are not in the hand, as well as the card that has just been played
  // (reset to 0).
  if (options.reweight) {
    state.deck = getIncreasedDeckWeight({
      deck: state.deck,
      hand: state.hand,
      reset: [card],
    })
  }

  handleCardEffect(state, cardData, options.mode, HoS)

  // If the current Brawl modifier is the “Great Mill”, refill the hand after
  // each card is played.
  if (options.modifier === 'THE_GREAT_MILL') {
    refill(state)
  }

  return state
}

export default play
