import DECKS from '~/data/decks'
import serialization from '~/helpers/serialization'

const deckIndex = DECKS.reduce((acc, deck) => {
  const cards = serialization.deck.deserialize(deck.id)
  const ids = cards.map(card => card.id).sort()

  acc[ids.join(',')] = deck
  return acc
}, {})

const isSuggestedDeck = deckCards =>
  deckIndex[
    deckCards
      .map(card => card.id)
      .sort()
      .join(',')
  ]

export default isSuggestedDeck
