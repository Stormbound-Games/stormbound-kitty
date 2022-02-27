const advice = cards => {
  const cardIds = cards.map(card => card.id)
  const hasUpgradePoint = cardIds.includes('I10')
  const hasEbonrock = cardIds.includes('N13')
  const { faction } = cards.find(card => card.faction !== 'neutral') || {}

  // Upgrade Point is considered more efficient than Fort of Ebonrock
  // in Ironclad decks.
  if (faction !== 'ironclad' || hasUpgradePoint || !hasEbonrock) return null

  return {
    name: 'Suboptimal Structure',
    description:
      'This Ironclad deck includes Fort of Ebonrock, which could be considered less efficient than Upgrade Point. Consider replacing it with Upgrade Point.',
    highlight: ['N13'],
  }
}

export default advice
