const getSatyrs = cards => cards.filter(card => card.race === 'satyr')

const SATYR_THRESHOLD = 4

export default cards => {
  const hasCard = id => cards.map(card => card.id).includes(id)
  const hasQueenOfHerds = hasCard('S21')
  const satyrs = getSatyrs(cards)

  // If the deck has cards Queen of Herds, but not enough satyrs to properly
  // use be spawned, it is considered inefficient.
  if (!hasQueenOfHerds || satyrs.length >= SATYR_THRESHOLD) return null

  return {
    name: 'Undervalued Queen of Herds',
    description: `This deck includes Queen of Herds, but doesn’t include enough satyrs to provide good synergy. Consider including more satyrs.`,
    highlight: ['S21', ...satyrs],
  }
}
