import unfoldValue from '~/helpers/unfoldValue'
import resolveAbility from '~/helpers/resolveAbility'
import isCardLevelResolved from '~/helpers/isCardLevelResolved'

const getResolvedCardData = (cardsIndex, card) => {
  const { id, level, copies, missing } = card || {}

  // If no `id` is given, return early
  if (!id) {
    return null
  }

  const [displayId] = id.toUpperCase().split('_')

  // Find the card data from the given id, and return early if it wasn’t found
  const cardData = cardsIndex[displayId]

  if (!cardData) {
    return null
  }

  // If it looks like the card is already fully resolved, return right away
  if (isCardLevelResolved(card)) {
    return card
  }

  // Find the card data for the given level, or default to the first level if
  // not found
  const unfoldedMana = cardData.mana ? unfoldValue(cardData.mana) : null
  const unfoldedStrength = cardData.strength
    ? unfoldValue(cardData.strength)
    : null
  const unfoldedAbility = resolveAbility(cardData.ability).values
  const mana = unfoldedMana
    ? +(unfoldedMana[level - 1] || unfoldedMana[0])
    : null
  const strength = unfoldedStrength
    ? +(unfoldedStrength[level - 1] || unfoldedStrength[0])
    : null
  const ability = unfoldedAbility[level - 1] || unfoldedAbility[0]

  return {
    ...cardData,
    copies: typeof copies === 'undefined' ? null : copies,
    missing: missing || null,
    mana,
    strength,
    ability,
    level,
  }
}

export default getResolvedCardData
