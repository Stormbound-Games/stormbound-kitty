const advice = cards => {
  const cardIds = cards.map(card => card.id)
  const hasBoomingProfessors = cardIds.includes('I28')
  const hasDestructobots = cardIds.includes('I1')

  // Destructobots synergizes well with Booming Professors.
  if (!hasBoomingProfessors || hasDestructobots) return null

  return {
    name: 'Suboptimal Booming Professors',
    description:
      'This deck includes Booming Professors but not Destructobots, which it synergizes with well. Consider including Destructobots in your deck.',
    highlight: ['I28'],
  }
}

export default advice
