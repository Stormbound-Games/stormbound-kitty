const getSatyrs = cards => cards.filter(card => card.race === 'satyr')

const advice = cards => {
  const queenOfHerds = cards.find(card => card.id === 'S21')
  const satyrs = getSatyrs(cards)

  if (!queenOfHerds || satyrs.length >= (queenOfHerds.level >= 4 ? 2 : 1))
    return null

  return {
    name: 'Inefficient Queen of Herds',
    description: `This deck includes Queen of Herds, but doesn’t include enough satyrs to provide good synergy. Consider including more satyrs.`,
    highlight: ['S21', ...satyrs],
  }
}

export default advice
