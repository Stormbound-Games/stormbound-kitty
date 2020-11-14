import decks from '../../data/decks'
import serialisation from '../serialisation'

const deckIndex = decks.reduce((acc, deck) => {
  const cards = serialisation.deck.deserialise(deck.id)
  const ids = cards.map(card => card.id).sort()

  acc[ids.join(',')] = deck
  return acc
}, {})

export default deckCards =>
  deckIndex[
    deckCards
      .map(card => card.id)
      .sort()
      .join(',')
  ]
