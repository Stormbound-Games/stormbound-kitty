const getStaticCards = cards =>
  cards.filter(
    card => (card.movement || 0) < 1 && !['N66', 'N67', 'N68'].includes(card.id)
  )

const advice = cards => {
  const staticCards = getStaticCards(cards)

  // Slow decks (decks which contain a lot of cards which do not move) can
  // suffer against early rush decks. The wild cats with no base movement but
  // which gain movement on play (Bigthrust Tigers, Wild Saberpaws and Twilight
  // Prowlers) are excluded from this check.
  if (staticCards.length <= 6) return null

  return {
    name: 'Slow deck',
    description: `This deck has ${staticCards.length} cards that don’t initially move, which makes it more likely to struggle against aggressive and rush decks. Consider swapping some static cards for some movers.`,
    highlight: staticCards,
  }
}

export default advice
