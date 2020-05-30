const hasAny = (cards, ids) =>
  ids.some(id => cards.map(card => card.id).includes(id))

export default cards => {
  const cardIds = cards.map(card => card.id)
  const hasFreezeConsumer = cardIds.includes('W1') || cardIds.includes('W4')
  const hasFreezeCards = hasAny(cards, ['W2', 'W6', 'W11'])

  if (!hasFreezeConsumer || hasFreezeCards) return null

  return {
    id: 'INEFFICIENT_FREEZE_COMBOS',
    name: 'Inefficient freeze combos',
    description:
      'This deck includes cards needing freeze effects but doesn’t include cards with freeze capacity. Consider including Moment’s Peace, Frosthexers or Midwinter Chaos.',
    highlight: ['W2', 'W11', 'W6'],
  }
}
