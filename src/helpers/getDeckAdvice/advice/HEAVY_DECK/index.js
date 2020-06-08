const getAverageManaCost = cards =>
  cards.map(c => c.mana).reduce((a, b) => a + b, 0) / cards.length

export default cards => {
  const averageManaCost = getAverageManaCost(cards)

  // `5.5` is an arbitrary threshold. This check really is only there to mark
  // unusually expensive decks. The `HIGH_MANA_CURVE` check is a better
  // representation of how effective the mana cost of a deck is without relying
  // on the average, which is misleading (e.g. 12 cards costing 4 mana yields a
  // decent average but has a dreadful mana-curve).
  if (averageManaCost <= 5.5) return null

  return {
    id: 'HEAVY_DECK',
    name: 'Heavy deck',
    description: `This deck has an average mana cost of ${averageManaCost.toFixed(
      2
    )}, which might be a little high. Consider including some cheaper cards so the mana flow gets smoother.`,
  }
}
