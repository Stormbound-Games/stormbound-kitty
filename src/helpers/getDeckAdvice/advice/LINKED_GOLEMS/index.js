const getConstructs = cards =>
  cards.filter(c => c.unitTypes.includes('construct'))

const advice = cards => {
  const hasLinkedGolems = cards.map(card => card.id).includes('I8')
  const constructs = getConstructs(cards)

  // For Linked Golems to be considered efficient, it needs a few constructs to
  // be paired with.
  if (!hasLinkedGolems || constructs.length >= 3) return null

  return {
    name: 'Inefficient Linked Golems',
    description:
      'This deck includes Linked Golems but doesn’t include enough constructs to provide good synergy. Consider including more constructs.',
    highlight: constructs,
  }
}

export default advice
