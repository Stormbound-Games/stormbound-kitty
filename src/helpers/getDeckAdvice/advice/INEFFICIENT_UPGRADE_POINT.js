const getConstructs = cards => cards.filter(card => card.race === 'construct')

export default cards => {
  const constructs = getConstructs(cards)
  const cardIds = cards.map(card => card.id)
  const hasUpgradePoint = cardIds.includes('I10')
  const upgradePointSynergy =
    cardIds.includes('I14') || cardIds.includes('I2')
      ? constructs.length + 1
      : constructs.length

  if (!hasUpgradePoint || upgradePointSynergy >= 5) return null

  return {
    id: 'INEFFICIENT_UPGRADE_POINT',
    name: 'Undervalued Upgrade Point',
    description:
      'This deck includes Upgrade Point but doesn’t include enough constructs to provide good synergy. Consider including more constructs or Mech Workshop.',
    highlight: ['I10', 'I14', ...constructs],
  }
}
