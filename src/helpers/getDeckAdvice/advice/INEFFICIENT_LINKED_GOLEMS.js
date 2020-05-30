const getConstructs = cards => cards.filter(c => c.race === 'construct')

export default cards => {
  const hasLinkedGolems = cards.map(card => card.id).includes('I8')
  const constructs = getConstructs(cards)

  if (!hasLinkedGolems || constructs.length > 2) return null

  return {
    id: 'INEFFICIENT_LINKED_GOLEMS',
    name: 'Undervalued Linked Golems',
    description:
      'This deck includes Linked Golems but doesn’t include enough constructs to provide good synergy. Consider including more constructs.',
    highlight: constructs,
  }
}
