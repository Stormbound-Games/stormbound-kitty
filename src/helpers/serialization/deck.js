import serialization from './'
import { base64Decode } from '~/helpers/base64'
import { convertToSkId } from '~/helpers/convertDeckId'

const serializeDeck = cards => {
  // Do not en/decode to base64 as the hash ends up being longer than the
  // original data. While it might make sense for sims or cards, it is
  // unnecessary for decks which are highly compressible to begin with.
  return serialization.cards.serialize(cards).toLowerCase()
}

/**
 * Deserialize a deck into an array of cards
 * @param {String} hash - Either base64 hash (old) or card string (new)
 * @return {Object[]} cards
 */
const deserializeDeck = (cardsIndexBySid, hash) => {
  try {
    const string = base64Decode(hash)

    // If the base64 decoded string is a Stormbound deck ID, it should be
    // converted to a Stormbound-Kitty deck ID before being decoded. Note that
    // we pass the base64 hash, and not the decoded string, as `convertToSkId`
    // expects a base 64 value.
    if (/^\d((b|s|u|ua|ud|ue|ut)\d+)+$/.test(string)) {
      const deckId = convertToSkId(cardsIndexBySid, hash)

      return serialization.cards.deserialize(deckId)
    }

    // The card serialization system operates within the base64 range, which
    // means it is technically possible to base64 decode a deck string without
    // an error. Therefore, we check if the base64 decoded string contains only
    // numbers, faction indicators and comma (for old decks). If it doesn’t, it
    // means the input was not actually a base64 hash but deck string to be
    // deserialized.
    if (!/^[NSFWIT\d,]+$/.test(string)) {
      return serialization.cards.deserialize(hash.toUpperCase())
    }

    // Maintain backward compability with decks serialized in base64.
    return serialization.cards.deserialize(string)
  } catch (error) {
    return serialization.cards.deserialize(hash.toUpperCase())
  }
}

const deck = {
  serialize: serializeDeck,
  deserialize: deserializeDeck,
}

export default deck
