import serialization from './'
import { base64Decode } from '~/helpers/base64'
import { convertToSkId, isDecodedSbId } from '~/helpers/convertDeckId'

const serializeDeck = cards => {
  // Do not en/decode to base64 as the hash ends up being longer than the
  // original data. While it might make sense for sims or cards, it is
  // unnecessary for decks which are highly compressible to begin with.
  return serialization.cards.serialize(cards).toLowerCase()
}

// Deserialize a deck into an array of cards
// @param {Object} cardsIndexBySid - Cards index with Stormbound IDs as keys
// @param {String} input - Either a base64-encoded Stormbound deck ID or a non-
//                         encoded Stormbound-Kitty deck ID
// @return {Object[]} cards
const deserializeDeck = (cardsIndexBySid, input) => {
  try {
    const decoded = base64Decode(input)

    // If the base64 decoded string is a Stormbound deck ID, it should be
    // converted to a Stormbound-Kitty deck ID before being deserialized.
    // Note that we pass the base64 hash, and not the decoded string, as
    // `convertToSkId` expects a base64 value.
    if (isDecodedSbId(decoded)) {
      return serialization.cards.deserialize(
        convertToSkId(cardsIndexBySid, input)
      )
    }

    // The card serialization system operates within the base64 range, which
    // means it is technically possible to base64 decode a deck string without
    // an error. Therefore, we check if the base64 decoded string contains only
    // numbers, faction indicators (and comma for old decks). If it doesn’t, it
    // means the input was not actually a base64 hash to be decoded but the deck
    // string to be deserialized.
    const value = /^[NSFWIT\d,]+$/.test(decoded) ? decoded : input

    return serialization.cards.deserialize(value)
  } catch {
    return serialization.cards.deserialize(input)
  }
}

const deck = {
  serialize: serializeDeck,
  deserialize: deserializeDeck,
}

export default deck
