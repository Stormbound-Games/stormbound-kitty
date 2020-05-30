const hasAny = (cards, ids) =>
  ids.some(id => cards.map(card => card.id).includes(id))

export default cards => {
  const cardIds = cards.map(card => card.id)
  const hasBroodSages = cardIds.includes('F1')
  const hasPoisonCards = hasAny(cards, ['F2', 'F4', 'F5', 'F13'])
  const hasHeliotroopers = cardIds.includes('F7')
  const hasObsidianButchers = cardIds.includes('F17')
  const hasRainOfFrogs = cardIds.includes('F8')
  const hasAzureHatchers = cardIds.includes('F10')

  if (
    !hasObsidianButchers ||
    hasRainOfFrogs ||
    hasAzureHatchers ||
    (hasBroodSages && (hasPoisonCards || hasHeliotroopers))
  )
    return null

  return {
    id: 'INEFFICIENT_OBSIDIAN_BUTCHERS',
    name: 'Undervalued Obsidian Butchers',
    description:
      'This deck includes Obsidian Butchers but doesn’t include a way to spawn many one strength units. Consider including Rain of Frogs, Azure Hatchers, or Brood Sages and Poison Cards.',
    highlight: ['F17', 'F8', 'F10'],
  }
}
