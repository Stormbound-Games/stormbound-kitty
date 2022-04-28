const getUnitTypes = cards => [
  ...new Set(cards.filter(card => card.id !== 'N35').flatMap(c => c.unitTypes)),
]

const advice = cards => {
  const unitTypes = getUnitTypes(cards)
  const hasUbassTheHunter = cards.map(card => card.id).includes('N35')

  // For Ubass the Hunter to be considered efficient, it needs a certain amout
  // of unit types in the deck itself so it can be set up properly.
  if (!hasUbassTheHunter || unitTypes.length >= 5) return null

  return {
    name: 'Inefficient Ubass the Hunter',
    description: `This deck includes Ubass the Hunter but has only ${
      unitTypes.length
    } unit type${
      unitTypes.length === 1 ? '' : 's'
    }  which is unusually low. Consider bring more unit types to get the most out of Ubass the Hunter.`,
    highlight: ['N35'],
  }
}

export default advice
