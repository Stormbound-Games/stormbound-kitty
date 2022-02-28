const getOddManaCards = cards => cards.filter(c => c.mana % 2 !== 0)
const getEvenManaCards = cards =>
  cards.filter(c => c.mana > 0 && c.mana % 2 === 0)

const advice = cards => {
  const oddManaCards = getOddManaCards(cards)
  const evenManaCards = getEvenManaCards(cards)

  if (oddManaCards.length < 9 && evenManaCards.length < 9) return null

  const name = oddManaCards > evenManaCards ? 'odd' : 'even'
  const opposite = oddManaCards > evenManaCards ? 'even' : 'odd'

  return {
    name: 'Unbalanced mana cost',
    description: `This deck has most cards costing an ${name} amount of mana, therefore reducing the amount of cards that can be played on ${opposite} turns. Consider balancing the mana cost a bit more.`,
    highlight: oddManaCards,
  }
}

export default advice
