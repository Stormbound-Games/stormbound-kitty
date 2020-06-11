const getStructures = cards => cards.filter(c => c.type === 'structure')
const STRUCTURE_THRESHOLD = 3

export default cards => {
  const structures = getStructures(cards)

  // Too many structures in a deck results in a lack of mobility and the possibility of
  // crowding the board.
  if (structures.length <= STRUCTURE_THRESHOLD) return null

  return {
    name: 'Too many structures',
    description:
      'This deck includes a lot of structures, which may impeded its mobility. Consider swapping some structures for units or spells.',
    highlight: structures,
  }
}
