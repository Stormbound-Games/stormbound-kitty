import serialisation from './'
import { base64Decode } from '../base64'

const serialiseDeck = cards => {
  // Do not en/decode to base64 as the hash ends up being longer than the
  // original data. While it might make sense for sims or cards, it is
  // unnecessary for decks which are highly compressible to begin with.
  return serialisation.cards.serialise(cards).toLowerCase()
}

/**
 * Deserialise a deck into an array of cards
 * @param {String} hash - Either base64 hash (old) or card string (new)
 * @return {Object[]} cards
 */
const deserialiseDeck = hash => {
  try {
    const string = base64Decode(hash)
    const variants = {}

    // The card serialisation system operates within the base64 range, which
    // means it is technically possible to base64 decode a deck string without
    // an error. Therefore, we check if the base64 decoded string contains only
    // numbers, faction indicators and comma (for old decks). If it doesn’t, it
    // means the input was not actually a base64 hash but deck string to be
    // deserialised.
    if (!/^[NSFWIT\d,]+$/.test(string)) {
      return {
        deck: serialisation.cards.deserialise(hash.toUpperCase()),
        variants,
      }
    }

    // Maintain backward compability with decks serialised in base64.
    return { deck: serialisation.cards.deserialise(string), variants }
  } catch (error) {
    const [deck, sides = ''] = hash.split('-')
    const deckCards = serialisation.cards.deserialise(deck.toUpperCase())
    const deckIds = deckCards.map(card => card.id)
    const variants = serialisation.cards
      .deserialise(sides.toUpperCase())
      .reduce((acc, card) => {
        if (deckIds.includes(card.id)) {
          acc.current = card.id
          acc[card.id] = []
        } else {
          acc[acc.current].push(card)
        }
        return acc
      }, {})
    delete variants.current

    return { deck: deckCards, variants: variants }
  }
}

export default {
  serialise: serialiseDeck,
  deserialise: deserialiseDeck,
}
