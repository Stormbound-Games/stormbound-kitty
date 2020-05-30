const hasAny = (cards, ids) =>
  ids.some(id => cards.map(card => card.id).includes(id))

export default cards => {
  const cardIds = cards.map(card => card.id)
  const hasBroodSages = cardIds.includes('F1')
  const hasPoisonCards = hasAny(cards, ['F2', 'F4', 'F5', 'F13'])
  const hasHeliotroopers = cardIds.includes('F7')

  if (!hasBroodSages || hasPoisonCards || hasHeliotroopers) return null

  return {
    id: 'INEFFICIENT_BROOD_SAGES',
    name: 'Undervalued Brood Sages',
    description:
      'This deck includes Brood Sages but doesn’t include cards with poison capacity. Consider including Venomfall Spire, Toxic Sacrifice, Copperskin Rangers, Amberhides or Crimson Sentry.',
    highlight: ['F1'],
  }
}
