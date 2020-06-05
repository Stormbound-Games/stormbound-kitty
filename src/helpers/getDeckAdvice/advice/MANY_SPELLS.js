const getSpells = cards => cards.filter(c => c.type === 'spell')

export default (cards, modifier) => {
  const spells = getSpells(cards)
  const cardIds = cards.map(card => card.id)
  const spawnSpells = ['N2', 'S24'].filter(id => cardIds.includes(id))
  const threshold = 2 + spawnSpells.length

  if (spells.length <= threshold || modifier === 'SPELL_MANA') return null

  return {
    id: 'MANY_SPELLS',
    name: 'Many spells',
    description: `This deck has ${spells.length} spells which might be unusually high. Consider swapping a spell for a unit or structure to be less situational.`,
    highlight: spells,
  }
}
