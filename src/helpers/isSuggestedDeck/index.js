import decks from '../../data/decks'
import serialisation from '../serialisation'

export default deckCards => {
  const deckIds = deckCards.map(card => card.id)

  return decks.find(deck =>
    serialisation.deck
      .deserialise(deck.id)
      .every(card => deckIds.includes(card.id))
  )
}
