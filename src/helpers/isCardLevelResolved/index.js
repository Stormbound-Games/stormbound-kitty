const isCardLevelResolved = card => {
  // For a card level to be considered resolved, the name should be there. To be
  // entirely honest, I’m not quite sure why… I assume it’s to circumvent some
  // awkward bug in the card builder where a card might not have a name yet?
  if (!card.name) return false

  // If the strength is defined, it should not include slashes, otherwise it
  // means it hasn’t been resolved yet.
  if (card.strength && String(card.strength).includes('/')) return false

  // If the ability is defined, it should not include slashes, otherwise it
  // means it hasn’t been resolved yet.
  if (card.ability && card.ability.includes('/')) return false

  // If the mana cost is defined, it should not include slashes, otherwise it
  // means it hasn’t been resolved yet.
  if (card.mana && String(card.mana).includes('/')) return false

  // If card mana is not defined, it should be considered not resolved. Again,
  // not sure why.
  if (!card.mana && card.mana !== 0) return false

  return true
}
export default isCardLevelResolved
