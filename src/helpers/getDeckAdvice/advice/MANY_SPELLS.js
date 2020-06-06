const getSpells = cards => cards.filter(c => c.type === 'spell')

export default (cards, modifier) => {
  const spells = getSpells(cards)
  const cardIds = cards.map(card => card.id)
  const skippedSpells = ['N2', 'S24', 'W19', 'F8'].filter(id =>
    cardIds.includes(id)
  )
  const threshold = 2 + skippedSpells.length

  // Decks which contain many spells can suffer from lack of units and movement
  // (except in spell Brawl). Some spells are excluded from the count as they
  // spawn units (Summon Militia, Head Start and Rain of Frogs). Gift of the
  // Wise is also excluded because it is essentially a free card.
  if (spells.length <= threshold || modifier === 'SPELL_MANA') return null

  return {
    id: 'MANY_SPELLS',
    name: 'Many spells',
    description: `This deck has ${spells.length} spells which might be unusually high. Consider swapping a spell for a unit or structure to be less situational.`,
    highlight: spells,
  }
}
