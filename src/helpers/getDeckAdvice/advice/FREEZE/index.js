const hasAny = (cards, ids) =>
  ids.some(id => cards.map(card => card.id).includes(id))

export default cards => {
  const cardIds = cards.map(card => card.id)
  const hasFreezeConsumer = cardIds.includes('W1') || cardIds.includes('W4')
  const hasFreezeProvider = hasAny(cards, ['W2', 'W6', 'W11'])

  // If the deck has cards requiring freeze (consumers), but no cards freezing
  // enemies (providers), it is considered inefficient. If it does not have
  // cards requiring freeze however, the advice can be skipped.
  if (!hasFreezeConsumer || hasFreezeProvider) return null

  return {
    name: 'Inefficient freeze combos',
    description:
      'This deck includes cards needing freeze effects but doesn’t include cards with freeze capacity. Consider including Moment’s Peace, Frosthexers or Midwinter Chaos.',
    highlight: ['W2', 'W11', 'W6'],
  }
}
