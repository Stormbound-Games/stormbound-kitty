const FREEZE_CARD_IDS = ['W1', 'W2', 'W6', 'W11', 'W32']
const containsFreeze = deck =>
  deck.map(card => card.id).some(id => FREEZE_CARD_IDS.includes(id))

const advice = cards => {
  const cardIds = cards.map(card => card.id)
  const hasFreezingCards = containsFreeze(cards)
  const hasSpellbinderZhevana = cardIds.includes('W8')

  // For Spellbinder Zhevana to be considered efficient, she needs freezing
  // cards.
  if (!hasSpellbinderZhevana || hasFreezingCards) {
    return null
  }

  return {
    name: 'Inefficient Spellbinder Zhevana',
    description:
      'This deck includes Spellbinder Zhevana but doesn’t include efficient freeze cards. Consider including cards which can freeze units.',
    highlight: FREEZE_CARD_IDS,
  }
}

export default advice
