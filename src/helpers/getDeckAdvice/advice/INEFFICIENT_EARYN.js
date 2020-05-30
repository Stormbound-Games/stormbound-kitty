const getSpells = cards => cards.filter(c => c.type === 'spell')

export default cards => {
  const hasArchdruidEaryn = cards.map(card => card.id).includes('N48')
  const spells = getSpells(cards)

  if (!hasArchdruidEaryn || spells.length >= 2) return null

  return {
    id: 'INEFFICIENT_EARYN',
    name: 'Undervalued Archdruid Earyn',
    description: `This deck includes Archdruid Earyn but has only ${spells.length} spell, which is unusually low. Consider adding an extra spell to get the most out of Archdruid Earyn.`,
    highlight: ['N48', ...spells],
  }
}
