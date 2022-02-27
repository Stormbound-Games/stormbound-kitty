const hasAny = (cards, ids) =>
  ids.some(id => cards.map(card => card.id).includes(id))

const advice = cards => {
  const cardIds = cards.map(card => card.id)
  const hasHighPriestessKlaxi = cardIds.includes('F23')
  const hasRainOfFrogs = cardIds.includes('F8')
  const hasAzureHatchers = cardIds.includes('F10')
  const hasBroodSages = cardIds.includes('F1')
  const hasPoisonCards = hasAny(cards, ['F2', 'F4', 'F5', 'F13'])
  const hasHeliotroopers = cardIds.includes('F7')
  const averageLevel =
    cards.map(card => card.level).reduce((acc, level) => acc + level, 0) / 12

  // For High Priestess Klaxi to be considered efficient, it needs Rain of Frogs
  // or Azure Hatchers, or an efficient Brood Sages (although this is less ideal
  // and could be considered inefficient on its own). Aditionally, so many cards
  // have only 1 strength at low level that Klaxi could be considered efficient
  // even if it doesn’t have any of these cards to be paired with.
  if (
    !hasHighPriestessKlaxi ||
    hasRainOfFrogs ||
    hasAzureHatchers ||
    (hasBroodSages && (hasPoisonCards || hasHeliotroopers)) ||
    averageLevel < 2
  )
    return null

  return {
    name: 'Inefficient High Priestess Klaxi',
    description:
      'This deck includes High Priestess Klaxi but doesn’t include a way to spawn many units of the same strength. Consider including Rain of Frogs, Azure Hatchers, or Brood Sages and Poison Cards.',
    highlight: ['F23', 'F8', 'F10'],
  }
}

export default advice
