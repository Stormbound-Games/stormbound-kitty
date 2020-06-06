const hasAny = (cards, ids) =>
  ids.some(id => cards.map(card => card.id).includes(id))

export default cards => {
  const hasPoisonProvider = hasAny(cards, ['F2', 'F4', 'F5', 'F13'])
  const hasPoisonConsumer = hasAny(cards, ['F11', 'F15'])

  // If the deck has cards requiring poison (consumers), but no cards
  // poisoning enemies (providers), it is considered inefficient. If it does not
  // have cards requiring poison however, the advice can be skipped.
  if (!hasPoisonConsumer || hasPoisonProvider) return null

  return {
    id: 'INEFFICIENT_POISON_COMBOS',
    name: 'Inefficient poison combos',
    description:
      'This deck includes cards needing poison effects but doesn’t include cards with poison capacity. Consider including Venomfall Spire, Toxic Sacrifice, Copperskin Rangers, or Crimson Sentry.',
    highlight: ['F11', 'F15'],
  }
}
