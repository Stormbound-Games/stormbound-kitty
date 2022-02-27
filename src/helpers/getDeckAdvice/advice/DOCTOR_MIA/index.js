const getStructures = cards => cards.filter(c => c.type === 'structure')

const advice = cards => {
  const structures = getStructures(cards)
  const cardIds = cards.map(card => card.id)
  const hasDoctorMia = cardIds.includes('I2')
  const miaStructures = structures.filter(
    card => !['N13', 'I5', 'I14'].includes(card.id)
  )

  // For Doctor Mia to be considered efficient, she needs adequate structures to
  // be paired with. We considere all structures to be fine except Fort of
  // Ebonrock, Unstable Build and Mech Workshop (since it blocks its own spawn).
  if (!hasDoctorMia || miaStructures.length > 0) return null

  return {
    name: 'Inefficient Doctor Mia',
    description:
      'This deck includes Doctor Mia but doesn’t include any structures that have a good synergy with her. Consider including structures such as Upgrade Point, or Siege Assembly.',
    highlight: ['I2', ...structures],
  }
}

export default advice
