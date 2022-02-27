const getHeroes = cards => cards.filter(c => c.hero)
const getElders = cards => cards.filter(c => c.elder)
const getRaces = cards => [...new Set(cards.map(c => c.race).filter(Boolean))]

const advice = cards => {
  const races = getRaces(cards)
  const heroes = getHeroes(cards)
  const elders = getElders(cards)
  // “Hero” counts as a trigger for Ubass’ ability, but not from himself. So as
  // long as there is another hero in the deck, we can count an extra “race”.
  // Similarly, “Elder” also counts as a trigger for Ubass as well.
  const racesForUbass =
    races.length + Math.min(heroes.length - 1, 1) + Math.min(elders.length, 1)
  const hasUbassTheHunter = cards.map(card => card.id).includes('N35')

  // For Ubass the Hunter to be considered efficient, it needs a certain amout
  // of races in the deck itself so it can be set up properly.
  if (!hasUbassTheHunter || racesForUbass >= 5) return null

  return {
    name: 'Inefficient Ubass the Hunter',
    description: `This deck includes Ubass the Hunter but has only ${racesForUbass} race${
      racesForUbass === 1 ? '' : 's'
    } (including heroes/elders) which is unusually low. Consider bring more races to get the most out of Ubass the Hunter.`,
    highlight: ['N35'],
  }
}

export default advice
