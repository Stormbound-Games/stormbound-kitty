const getAverageManaCost = cards =>
  cards.map(card => card.mana).reduce((a, b) => a + b, 0) / cards.length
const MANA_THRESHOLD = 3

const advice = cards => {
  const cardIds = cards.map(card => card.id)
  const hasNorthseaDog = cardIds.includes('N5')
  const hasFirstMutineer = cardIds.includes('N12')
  const { faction } = cards.find(card => card.faction !== 'neutral') || {}
  const hasGiftOfTheWise = cardIds.includes('W19')
  const hasFrozenCore = cardIds.includes('W9')
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
    )}, which might make it difficult to play as a last card. Consider using a few more cheap cards, or including First Mutineers${winterMessage}.`,
    highlight: ['N5'],
  }
}

export default advice
