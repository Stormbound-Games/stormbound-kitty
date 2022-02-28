const getStructures = cards => cards.filter(c => c.type === 'structure')

const advice = cards => {
  const structures = getStructures(cards)
  const cheapStructures = structures.filter(card => card.mana <= 3)
  const cardIds = cards.map(card => card.id)
  const hasFortificationTonic = cardIds.includes('I3')

  // Fortification Tonic requires at least one structure costing 3 mana
  // or less to be considered efficient
  if (!hasFortificationTonic || cheapStructures.length > 0) return null

  return {
    name: 'Inefficient Fortification Tonic',
    description:
      'This deck includes Fortification Tonic but doesn’t include any cheap structures. Consider including at least one structure with a cost of 3 mana or less.',
    highlight: ['I3', ...structures],
  }
}

export default advice
