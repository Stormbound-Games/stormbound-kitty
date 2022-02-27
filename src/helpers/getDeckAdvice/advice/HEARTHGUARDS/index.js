const getStructures = cards => cards.filter(c => c.type === 'structure')
// Construction workers not considered for now; May be added later.
const structureSpawningCardIds = new Set([
  'W13', // Rockworkers
])
const getStructureSpawningCards = cards =>
  cards.filter(c => structureSpawningCardIds.has(c.id))

const advice = cards => {
  const structures = [
    ...getStructures(cards),
    ...getStructureSpawningCards(cards),
  ]
  const cheapStructures = structures.filter(card => card.mana <= 3)
  const cardIds = cards.map(card => card.id)
  const hasHearthguards = cardIds.includes('N39')
  const hasTwilightProwlers = cardIds.includes('N68')

  // Hearthguards requires at least two structures, or a structure costing 3 mana
  // or less to be considered efficient. Otherwise, it could be replaced with Twilight
  // Prowlers.
  if (!hasHearthguards || structures.length >= 2 || cheapStructures.length > 0)
    return null

  return {
    name: 'Inefficient Hearthguards',
    description:
      hasHearthguards && hasTwilightProwlers
        ? 'This deck includes Hearthguards but doesn’t include enough structures. Consider including more structures, or a structure with a cost of 3 mana or less.'
        : 'This deck includes Hearthguards but doesn’t include enough structures. Consider including more structures, a structure with a cost of 3 mana or less, or replacing it with Twilight Prowlers.',
    highlight: ['N39', ...structures],
  }
}

export default advice
