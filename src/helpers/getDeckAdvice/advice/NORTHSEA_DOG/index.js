export default cards => {
  const getAverageManaCost = cards =>
    cards.map(card => card.mana).reduce((a, b) => a + b, 0) / cards.length

  const MANA_THRESHOLD = 3
  const hasNorthseaDog = cards.map(card => card.id).includes('N5')
  const hasFirstMutineer = cards.map(card => card.id).includes('N12')
  const { faction } = cards.find(card => card.faction !== 'neutral') || {}
  const hasGiftOfTheWise = cards.map(card => card.id).includes('W19')
  const hasFrozenCore = cards.map(card => card.id).includes('W9')
  const winterConditions =
    faction === 'winter' && (hasFrozenCore || hasGiftOfTheWise)
  const averageManaCost = getAverageManaCost(cards)
  const winterMessage =
    faction === 'winter' ? `, Gift of the Wise or Frozen Core` : ''

  // For Northsea Dog to be considered efficient, it requires a low mana average
  // or to include First Mutineer, Gift of the Wise or Frozen Core.
  if (
    !hasNorthseaDog ||
    hasFirstMutineer ||
    averageManaCost <= MANA_THRESHOLD ||
    winterConditions
  )
    return null

  return {
    name: 'Inefficient Northsea Dog',
    description: `This deck includes Northsea Dog but has an average mana cost of ${averageManaCost.toFixed(
      2
    )}, which might be a bit high. Consider using a few more cheap cards, or including First Mutineers${winterMessage}.`,
    highlight: ['N5'],
  }
}
