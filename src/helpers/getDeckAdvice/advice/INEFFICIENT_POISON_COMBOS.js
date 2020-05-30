const hasAny = (cards, ids) =>
  ids.some(id => cards.map(card => card.id).includes(id))

export default cards => {
  const hasPoisonCards = hasAny(cards, ['F2', 'F4', 'F5', 'F13'])
  const hasPoisonConsumer = hasAny(cards, ['F11', 'F15'])

  if (!hasPoisonConsumer || hasPoisonCards) return null

  return {
    id: 'INEFFICIENT_POISON_COMBOS',
    name: 'Inefficient poison combos',
    description:
      'This deck includes cards needing poison effects but doesn’t include cards with poison capacity. Consider including Venomfall Spire, Toxic Sacrifice, Copperskin Rangers, or Crimson Sentry.',
    highlight: ['F11', 'F15'],
  }
}
