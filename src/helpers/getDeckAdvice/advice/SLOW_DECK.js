const getStaticCards = cards =>
  cards.filter(
    card => (card.movement | 0) < 1 && !['N66', 'N67', 'N68'].includes(card.id)
  )

export default cards => {
  const staticCards = getStaticCards(cards)

  if (staticCards.length <= 6) return null

  return {
    id: 'SLOW_DECK',
    name: 'Slow deck',
    description: `This deck has ${staticCards.length} cards that don’t initially move, which makes it more likely to struggle against aggressive and rush decks. Consider swapping some static cards for some movers.`,
    highlight: staticCards,
  }
}
