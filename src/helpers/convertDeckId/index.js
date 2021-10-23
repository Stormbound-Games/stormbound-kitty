import { FACTIONS } from '~/constants/game'
import serialization from '~/helpers/serialization'
import getRawCardData from '~/helpers/getRawCardData'
import { base64Decode, base64Encode } from '~/helpers/base64'

export const convertToSkId = blob => {
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
    .map(id => getRawCardData(id, 'sid').id)

  return serialization.deck.serialize(
    skIds
      // Fallback to cards level 1 since the cards’ level is not provided by
      // Stormbound deck IDs.
      .map(id => ({ id, level: 1 }))
  )
}

export const convertToSbId = deck => {
  const cards = deck.map(card => getRawCardData(card.id))
  const faction =
    cards.find(card => card.faction !== 'neutral')?.faction ?? 'neutral'
  const identifier = Object.keys(FACTIONS).indexOf(faction)

  return base64Encode(identifier + cards.map(card => card.sid).join(''))
}
