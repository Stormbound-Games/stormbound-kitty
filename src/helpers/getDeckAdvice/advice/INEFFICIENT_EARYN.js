const getSpells = cards => cards.filter(c => c.type === 'spell')

export default cards => {
  const archdruidEaryn = cards.find(card => card.id === 'N48')
  const spells = getSpells(cards)
  const threshold = archdruidEaryn && archdruidEaryn.level >= 4 ? 4 : 3

  if (!archdruidEaryn || spells.length >= threshold) return null

  return {
    id: 'INEFFICIENT_EARYN',
    name: 'Undervalued Archdruid Earyn',
    description: `This deck includes Archdruid Earyn (level ${archdruidEaryn.level}) but has only ${spells.length} spell, which is unusually low. Consider adding an extra spell to get the most out of Archdruid Earyn.`,
    highlight: ['N48', ...spells],
  }
}
