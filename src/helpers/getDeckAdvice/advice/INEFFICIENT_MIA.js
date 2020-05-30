const getStructures = cards => cards.filter(c => c.type === 'structure')

export default cards => {
  const structures = getStructures(cards)
  const cardIds = cards.map(card => card.id)
  const hasDoctorMia = cardIds.includes('I2')
  const miaStructures = structures.filter(
    card => !['N13', 'I5', 'I14'].includes(card.id)
  )

  if (!hasDoctorMia || miaStructures.length > 0) return null

  return {
    id: 'INEFFICIENT_MIA',
    name: 'Undervalued Doctor Mia',
    description:
      'This deck includes Doctor Mia but doesn’t include any structures that have a good synergy with her. Consider including structures such as Upgrade Point, or Siege Assembly.',
    highlight: ['I2', ...structures],
  }
}
