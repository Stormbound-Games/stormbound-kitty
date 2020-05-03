import decks from '../data/decks'
import { deserialiseDeck } from './deserialise'

export default deckCards =>
  decks.find(deck =>
    deserialiseDeck(deck.id).every(card => deckCards.includes(card.id))
  )
