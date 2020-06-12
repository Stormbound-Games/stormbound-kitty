import getRawCardData from '../../../getRawCardData'
const getSatyrs = cards => cards.filter(card => card.race === 'satyr')

export default cards => {
  const hasCard = id => cards.map(card => card.id).includes(id)
  const hasQueenOfHerds = hasCard('S21')
  const queenOfHerdsLvl = hasQueenOfHerds
    ? cards.find(card => card.id === 'S21').level
    : 1
  const satyrs = getSatyrs(cards)
  const SATYR_THRESHOLD = queenOfHerdsLvl > 3 ? 2 : 1

  // If the deck has Queen of Herds, but not enough satyrs to
  // be spawned, it is considered inefficient.
  if (!hasQueenOfHerds || satyrs.length >= SATYR_THRESHOLD) return null

  return {
    name: 'Undervalued Queen of Herds',
    description: `This deck includes Queen of Herds, but doesn’t include enough satyrs to provide good synergy. Consider including more satyrs.`,
    highlight: ['S21', ...satyrs],
  }
}
