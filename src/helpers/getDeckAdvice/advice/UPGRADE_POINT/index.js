const getConstructs = cards =>
  cards.filter(card => card.unitTypes.includes('construct'))

const advice = cards => {
  const constructs = getConstructs(cards)
  const cardIds = cards.map(card => card.id)
  const hasUpgradePoint = cardIds.includes('I10')
  const upgradePointSynergy =
    cardIds.includes('I14') || cardIds.includes('I2')
      ? constructs.length + 1
      : constructs.length

  // For Upgrade Point to be considered efficient, it needs a certain amount of
  // constructs in the deck. We increase the construct count (effectively
  // lowering the threshold) if the deck includes Mech Workshop (which spawns
  // constructs) or Doctor Mia (which can trigger Upgrade Point on the spot).
  if (!hasUpgradePoint || upgradePointSynergy >= 5) return null

  return {
    name: 'Inefficient Upgrade Point',
    description:
      'This deck includes Upgrade Point but doesn’t include enough constructs to provide good synergy. Consider including more constructs or Mech Workshop.',
    highlight: ['I10', 'I14', ...constructs],
  }
}

export default advice
