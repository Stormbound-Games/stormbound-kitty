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
  const factions = ['neutral', 'swarm', 'winter', 'ironclad', 'shadowfen']
  const cards = deck.map(card => getRawCardData(card.id))
  const nonNeutralCard = cards.find(card => card.faction !== 'neutral')
  const faction = nonNeutralCard ? nonNeutralCard.faction : 'neutral'
  const identifier = factions.indexOf(faction) || 1

  return base64Encode(identifier + cards.map(card => card.sid).join(''))
}
