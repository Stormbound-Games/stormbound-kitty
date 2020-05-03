import decks from '../data/decks'
import { deserialiseDeck } from './deserialise'

export default deckCards => {
  const deckIds = deckCards.map(card => card.id)
  return decks.find(deck =>
    deserialiseDeck(deck.id).every(card => deckIds.includes(card.id))
  )
}
