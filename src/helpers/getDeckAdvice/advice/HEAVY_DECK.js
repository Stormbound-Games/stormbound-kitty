const getAverageManaCost = cards =>
  cards.map(c => c.mana).reduce((a, b) => a + b, 0) / cards.length

export default cards => {
  const averageManaCost = getAverageManaCost(cards)

  if (averageManaCost <= 5.5) return null

  return {
    id: 'HEAVY_DECK',
    name: 'Heavy deck',
    description: `This deck has an average mana cost of ${averageManaCost.toFixed(
      2
    )}, which might be a little high. Consider including some cheaper cards so the mana flow gets smoother.`,
  }
}
