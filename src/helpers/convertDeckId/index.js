import serialization from '~/helpers/serialization'
import { base64Decode, base64Encode } from '~/helpers/base64'

export const convertToSkId = (cardsIndexBySid, blob) => {
  const hash = base64Decode(blob)
  const sbIds = hash
    // Slice off the first character which is the faction indicator.
    .slice(1)
    // Split the string on individual cards.
    .split(/([a-z]+\d+)/g)
    // Remove empty entries.
    .filter(Boolean)
  const skIds = sbIds
    // Get the Stormbound-Kitty ID from the Stormbound card ID.
    .map(id => cardsIndexBySid[id].id)

  return serialization.deck.serialize(
    skIds
      // Fallback to cards level 1 since the cards’ level is not provided by
      // Stormbound deck IDs.
      .map(id => ({ id, level: 1 }))
  )
}

export const convertToSbId = (cardsIndex, deck) => {
  const factions = ['neutral', 'swarm', 'winter', 'ironclad', 'shadowfen']
  const cards = deck.map(card => cardsIndex[card.id])
  const nonNeutralCard = cards.find(card => card.faction !== 'neutral')
  const faction = nonNeutralCard ? nonNeutralCard.faction : 'neutral'
  const identifier = factions.indexOf(faction) || 1

  return base64Encode(identifier + cards.map(card => card.sid).join(''))
}

export const isDecodedSbId = value => {
  // A Stormbound deck ID is made by concatening the card ID of all the cards
  // and then base64 encode the whole thing and prefixing it with a number that
  // represents the faction.
  // Here, we expect a base64 decoded string, and check whether it is in fact a
  // joined list of Stormbound card IDs. A Stormbound card ID is made of a
  // lowercase indicator (one or two letters) and some numbers (e.g. `u037`).
  //     /                             / Regular expression delimiters
  //      ^                           $  Beginning-to-end matching
  //       \d                            Single-digit (faction indicator)
  //         (                      )+   Series of cards IDs
  //          (b|s|u|ua|ud|ue|ut)\d+     Stormbound card ID syntax
  return /^\d((b|s|u|ua|ud|ue|ut)\d+)+$/.test(value)
}
