const advice = cards => {
  const cardIds = cards.map(card => card.id)
  const hasHeroicSoldiers = cardIds.includes('N32')
  const hasFluffyBadboxers = cardIds.includes('N60')

  // Heroic Soldiers can often be replaced with Fluffy Badboxers
  if (!hasHeroicSoldiers || hasFluffyBadboxers) return null

  return {
    name: 'Use of Heroic Soldiers',
    description:
      'Consider replacing Heroic Soldiers with Fluffy Badboxers if you have it with the same or more strength.',
    highlight: ['N32'],
  }
}

export default advice
