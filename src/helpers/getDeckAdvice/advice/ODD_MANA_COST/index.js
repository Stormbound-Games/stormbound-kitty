const getOddManaCards = cards => cards.filter(c => c.mana % 2 !== 0)

export default cards => {
  const oddManaCards = getOddManaCards(cards)

  if (oddManaCards.length < 9) return null

  return {
    id: 'ODD_MANA_COST',
    name: 'Odd-mana cost',
    description:
      'This deck has most cards costing an odd amount of mana, therefore reducing the amount of cards that can be played on even turns. Consider balancing the mana cost a bit more.',
    highlight: oddManaCards,
  }
}
