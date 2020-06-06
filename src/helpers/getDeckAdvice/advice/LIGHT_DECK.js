const getAverageManaCost = cards =>
  cards.map(card => card.mana).reduce((a, b) => a + b, 0) / cards.length

export default (cards, modifier = '') => {
  const averageManaCost = getAverageManaCost(cards)

  // `2.8` is an arbitrary threshold. This check really is only there to mark
  // unusually cheap decks (which are not the cause of a mana-Brawl modifier).
  // This is not a fantastic advice though, because the current meta highly
  // favour cheap decks over expensive ones. But extremely cheap decks might
  // suffer if they don’t finish the game early, so it’s worth an advice still.
  if (modifier.includes('MANA') || averageManaCost >= 2.8) return null

  return {
    id: 'LIGHT_DECK',
    name: 'Light deck',
    description: `This deck has an average mana cost of ${averageManaCost.toFixed(
      2
    )}, which might be a little low. Consider including one or two more expensive cards to be able to power through long games.`,
    highlight: cards.filter(card => card.mana < averageManaCost),
  }
}
