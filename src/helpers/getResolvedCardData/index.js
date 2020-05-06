import getRawCardData from '../getRawCardData'
import unfoldValue from '../unfoldValue'
import resolveAbility from '../resolveAbility'
import isCardLevelResolved from '../isCardLevelResolved'

export default card => {
  const { id, level, copies, missing } = card || {}

  // If no `id` is given, return early
  if (!id) {
    return null
  }

  const [displayId] = id.split('_')

  // Find the card data from the given id, and return early if it wasn’t found
  const cardData = getRawCardData(displayId)

  if (!cardData.id) {
    return null
  }

  // If it looks like the card is already fully resolved, return right away
  if (isCardLevelResolved(card)) {
    return card
  }

  // Find the card data for the given level, or default to the first level if
  // not found
  const unfoldedMana = unfoldValue(cardData.mana)
  const unfoldedStrength = unfoldValue(cardData.strength)
  const unfoldedAbility = resolveAbility(cardData.ability).values
  const mana = +(unfoldedMana[level - 1] || unfoldedMana[0])
  const strength =
    card.type !== 'spell'
      ? +(unfoldedStrength[level - 1] || unfoldedStrength[0])
      : null
  const ability = unfoldedAbility[level - 1] || unfoldedAbility[0]

  return { ...cardData, copies, missing, mana, strength, ability, level }
}
