const hasAny = (cards, ids) =>
  ids.some(id => cards.map(card => card.id).includes(id))

export default cards => {
  const cardIds = cards.map(card => card.id)
  const hasHighPriestessKlaxi = cardIds.includes('F23')
  const hasRainOfFrogs = cardIds.includes('F8')
  const hasAzureHatchers = cardIds.includes('F10')
  const hasBroodSages = cardIds.includes('F1')
  const hasPoisonCards = hasAny(cards, ['F2', 'F4', 'F5', 'F13'])
  const hasHeliotroopers = cardIds.includes('F7')

  if (
    !hasHighPriestessKlaxi ||
    hasRainOfFrogs ||
    hasAzureHatchers ||
    (hasBroodSages && (hasPoisonCards || hasHeliotroopers))
  )
    return null

  return {
    id: 'INEFFICIENT_KLAXI',
    name: 'Undervalued High Priestess Klaxi',
    description:
      'This deck includes High Priestess Klaxi but doesn’t include a way to spawn many units of the same strength. Consider including Rain of Frogs, Azure Hatchers, or Brood Sages and Poison Cards.',
    highlight: ['F23', 'F8', 'F10'],
  }
}
