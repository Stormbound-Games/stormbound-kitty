const getPlayableSpells = (cards, maxManaCost = Infinity) =>
  cards.filter(c => c.type === 'spell' && c.mana <= maxManaCost)

const advice = cards => {
  const archdruidEaryn = cards.find(card => card.id === 'N48')
  const spells = getPlayableSpells(
    cards,
    archdruidEaryn ? archdruidEaryn.mana : undefined
  )
  const threshold = archdruidEaryn && archdruidEaryn.level >= 4 ? 4 : 3

  // Whether Aeryn is effecient depends on her level. If she can play 2 spells
  // from the hand, the deck needs quite some many spells to make sure that one
  // has 2 in hand when playing Aeryn. If she plays only one spell at a time,
  // the threshold can be a little lower.
  if (!archdruidEaryn || spells.length >= threshold) return null

  return {
    name: 'Inefficient Archdruid Earyn',
    description: `This deck includes Archdruid Earyn (level ${archdruidEaryn.level}) but has only ${spells.length} spell, which is unusually low. Consider adding an extra spell to get the most out of Archdruid Earyn.`,
    highlight: ['N48', ...spells],
  }
}

export default advice
