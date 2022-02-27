const getPirates = cards => cards.filter(card => card.race === 'pirate')

const advice = cards => {
  const hasCard = id => cards.map(card => card.id).includes(id)
  const pirates = getPirates(cards)
  const hasLuckyCharmers = hasCard('N42')

  // If the deck has Lucky Charmers, but not enough pirates to properly use combos,
  // it is considered inefficient.
  if (!hasLuckyCharmers || pirates.length >= 5) return null

  return {
    name: 'Inefficient Lucky Charmers',
    description: `This deck includes Lucky Charmers, but doesn’t include enough pirates to provide good synergy. Consider including more pirates.`,
    highlight: pirates,
  }
}

export default advice
