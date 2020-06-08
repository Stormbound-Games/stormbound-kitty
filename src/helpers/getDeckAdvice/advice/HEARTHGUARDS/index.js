const getStructures = cards => cards.filter(c => c.type === 'structure')

export default cards => {
  const structures = getStructures(cards)
  const cheapStructures = structures.filter(card => card.mana <= 3)
  const cardIds = cards.map(card => card.id)
  const hasHearthguards = cardIds.includes('N39')

  // Hearthguards requires at least two structures, or a structure costing 3 mana
  // or less to be considered efficient
  if (!hasHearthguards || structures.length >= 2 || cheapStructures.length > 0)
    return null

  return {
    name: 'Inefficient Hearthguards',
    description:
      'This deck includes Hearthguards but doesn’t include enough structures. Consider including more structures, or a structure with a cost of 3 mana or less.',
    highlight: ['N39', ...structures],
  }
}
