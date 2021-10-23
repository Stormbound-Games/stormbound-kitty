import serialization from '~/helpers/serialization'
import getRawCardData from '~/helpers/getRawCardData'

const convertDeckId = hash => {
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
export default convertDeckId
