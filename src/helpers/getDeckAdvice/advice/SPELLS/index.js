const getSpells = cards => cards.filter(c => c.type === 'spell')

export default (cards, modifier) => {
  const spells = getSpells(cards)
  const cardIds = cards.map(card => card.id)
  const skippedSpells = ['N2', 'S24', 'W19', 'F8'].filter(id =>
    cardIds.includes(id)
  )
  const hasArchdruidEaryn = cardIds.includes('N48')
  const threshold = 2 + skippedSpells.length
  const earynThreshold = 5 + skippedSpells.length

  // Decks which contain many spells can suffer from lack of units and movement
  // (except in spell Brawl). Some spells are excluded from the count as they
  // spawn units (Summon Militia, Head Start and Rain of Frogs). Gift of the
  // Wise is also excluded because it is essentially a free card. If Archdruid
  // Earyn is present in the deck, more spells are acceptable.
  if (
    spells.length <= threshold ||
    modifier === 'SPELL_MANA' ||
    (hasArchdruidEaryn && spells.length <= earynThreshold)
  )
    return null

  return {
    name: 'Many spells',
    description: `This deck has ${spells.length} spells which might be unusually high. Consider swapping a spell for a unit or structure to be less situational.`,
    highlight: spells,
  }
}
