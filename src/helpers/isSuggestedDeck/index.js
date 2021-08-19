import DECKS from '~/data/decks'
import serialisation from '~/helpers/serialisation'

const deckIndex = DECKS.reduce((acc, deck) => {
  const cards = serialisation.deck.deserialise(deck.id)
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
