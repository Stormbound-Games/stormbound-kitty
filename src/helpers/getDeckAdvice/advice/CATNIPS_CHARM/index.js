const getFelines = cards => cards.filter(c => c.unitTypes.includes('feline'))

const advice = cards => {
  const felines = getFelines(cards)
  const cardIds = cards.map(card => card.id)
  const hasCatnipsCharm = cardIds.includes('N105')

  // For Catnip’s Charm to be considered efficient, it needs at least 2 felines
  // in the deck so that we can hope to have at least a feline on the board at
  // play time.
  if (!hasCatnipsCharm || felines.length >= 2) return null

  return {
    name: 'Inefficient Catnip’s Charm',
    description:
      'This deck includes Catnip’s Charm but doesn’t include enough felines to provide good synergy. Consider including more felines.',
    highlight: ['N105', ...felines],
  }
}

export default advice
