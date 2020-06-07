const getStructures = cards => cards.filter(c => c.type === 'structure')

export default cards => {
  const structures = getStructures(cards)
  const cardIds = cards.map(card => card.id)
  const hasFortificationTonic = cardIds.includes('I3')

  // Fortification Tonic requires at least one structure to be considered efficient
  if (!hasFortificationTonic || structures.length > 0) return null

  return {
    id: 'INEFFICIENT_FORTIFICATION_TONIC',
    name: 'Undervalued Fortification Tonic',
    description:
      'This deck includes Fortification Tonic but doesn’t include any structures. Consider including at least one structure.',
    highlight: ['I3', ...structures],
  }
}
