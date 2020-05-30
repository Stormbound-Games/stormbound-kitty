const getSpells = cards => cards.filter(c => c.type === 'spell')

export default cards => {
  const spells = getSpells(cards)
  const hasSummonMilitia = cards.map(card => card.id).includes('N2')
  const threshold = hasSummonMilitia ? 3 : 2

  if (spells.length <= threshold) return null

  return {
    id: 'MANY_SPELLS',
    name: 'Many spells',
    description: `This deck has ${spells.length} spells which might be unusually high. Consider swapping a spell for a unit or structure to be less situational.`,
    highlight: spells,
  }
}
