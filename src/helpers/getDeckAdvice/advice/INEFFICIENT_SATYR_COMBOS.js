const getSatyrs = cards => cards.filter(c => c.race === 'satyr')
const hasAny = (cards, ids) =>
  ids.some(id => cards.map(card => card.id).includes(id))

export default cards => {
  const hasSatyrSynergist = hasAny(cards, ['S5', 'S7', 'S9'])
  const satyrs = getSatyrs(cards)

  if (!hasSatyrSynergist || satyrs.length > 5) return null

  return {
    id: 'INEFFICIENT_SATYR_COMBOS',
    name: 'Inefficient Satyr Combos',
    description:
      'This deck includes Faun Companions, Swarmcallers, or Moonlit Aerie, but doesn’t include enough satyrs to provide good synergy. Consider including more satyrs.',
    highlight: ['S5', 'S7', 'S9', ...satyrs],
  }
}
