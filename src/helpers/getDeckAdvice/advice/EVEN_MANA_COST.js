const getEvenManaCards = cards =>
  cards.filter(c => c.mana > 0 && c.mana % 2 === 0)

export default cards => {
  const evenManaCards = getEvenManaCards(cards)

  if (evenManaCards.length < 9) return null

  return {
    id: 'EVEN_MANA_COST',
    name: 'Even-mana cost',
    description:
      'This deck has most cards costing an even amount of mana, therefore reducing the amount of cards that can be played on odd turns. Consider balancing the mana cost a bit more.',
    highlight: evenManaCards,
  }
}
