import getRawCardData from './getRawCardData'
import unfoldValue from './unfoldValue'
import resolveAbility from './resolveAbility'
import isCardLevelResolved from './isCardLevelResolved'

export default card => {
  const { id, level, copies, missing } = card || {}

  // If no `id` is given, return early
  if (!id) {
    return null
  }

  // In case of a token card, the ID is the card token ID + a unique identifier
  // in order to differentiate similar card tokens. To be able to display the
  // card correctly despite have a unique ID which obviously doesn’t exist in
  // the card database, we define a `displayId` which is used to know which card
  // to render, regardless of the actual ID.
  const displayId = card.token ? card.id.split(':')[0] : id

  // Find the card data from the given id, and return early if it wasn’t found
  const cardData = getRawCardData(displayId || id)

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
