const getHeroes = cards => cards.filter(c => c.hero)
const getRaces = cards => [...new Set(cards.map(c => c.race).filter(Boolean))]

export default cards => {
  const races = getRaces(cards)
  const heroes = getHeroes(cards)
  // “Hero” counts as a trigger for Ubass’ ability, but not from himself. So as
  // long as there is another hero in the deck, we can count an extra “race”.
  const racesForUbass = races.length + Math.min(heroes.length - 1, 1)
  const hasUbassTheHunter = cards.map(card => card.id).includes('N35')

  if (!hasUbassTheHunter || racesForUbass >= 4) return null

  return {
    id: 'INEFFICIENT_UBASS',
    name: 'Undervalued Ubass the Hunter',
    description: `This deck includes Ubass the Hunter but has only ${racesForUbass} race${
      racesForUbass === 1 ? '' : 's'
    } which is unusually low. Consider bring more races to get the most out of Ubass the Hunter.`,
    highlight: ['N35'],
  }
}
