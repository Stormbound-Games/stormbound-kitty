export default cards => {
  const cardIds = cards.map(card => card.id)
  const hasSpellbinderZhevana = cardIds.includes('W8')
  const hasMidwinterChaos = cardIds.includes('W11')
  const hasMomentsPeace = cardIds.includes('W6')

  // For Spellbinder Zhevana to be considered efficient, she needs frozen areas
  // which can be provided by Midwinter Chaos or Moment’s Peace (but not
  // Frosthexers).
  if (!hasSpellbinderZhevana || hasMidwinterChaos || hasMomentsPeace) {
    return null
  }

  return {
    id: 'INEFFICIENT_ZHEVANA',
    name: 'Undervalued Spellbinder Zhevana',
    description:
      "This deck includes Spellbinder Zhevana but doesn’t include efficient freeze cards. Consider including Moment's Peace or Midwinter Chaos.",
    highlight: ['W8', 'W11', 'W6'],
  }
}
