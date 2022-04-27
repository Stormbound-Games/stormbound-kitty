const hasAny = (cards, ids) =>
  ids.some(id => cards.map(card => card.id).includes(id))

const getDragons = cards => cards.filter(c => c.unitTypes.includes('dragon'))

const advice = cards => {
  const cardIds = cards.map(card => card.id)
  const hasBroodSages = cardIds.includes('F1')
  const hasPoisonCards = hasAny(cards, ['F2', 'F4', 'F5', 'F13'])
  const hasHeliotroopers = cardIds.includes('F7')
  const hasObsidianButchers = cardIds.includes('F17')
  const hasRainOfFrogs = cardIds.includes('F8')
  const hasAzureHatchers = cardIds.includes('F10')
  const ludicMatriarchs = cards.find(card => card.id === 'N43')
  const ludicMatriarchsLvl = ludicMatriarchs ? ludicMatriarchs.level : 0
  const dragons = getDragons(cards)
  const showDragonAdvice = ludicMatriarchsLvl > 2 || dragons.length < 3
  const averageLevel =
    cards.map(card => card.level).reduce((acc, level) => acc + level, 0) / 12

  const dragonMessage = showDragonAdvice
    ? ', or more dragons to synergize with Ludic Matriarchs'
    : ''

  // For Obsidian Butchers to be considered efficient, they need Rain of Frogs
  // or Azure Hatchers, or an efficient Brood Sages (although this is less ideal
  // and could be considered inefficient on its own). Aditionally, so many cards
  // have only 1 strength at low level that Butchers could be considered
  // efficient even if it doesn’t have any of these cards to be paired with.
  // In a dragon deck, Obsidian Butchers is a viable card if Ludic Matriarchs is
  // level 1 or 2 (as long as she spawns 1-strength dragons).
  if (
    !hasObsidianButchers ||
    hasRainOfFrogs ||
    hasAzureHatchers ||
    (hasBroodSages && (hasPoisonCards || hasHeliotroopers)) ||
    averageLevel < 2 ||
    !showDragonAdvice
  )
    return null

  return {
    name: 'Inefficient Obsidian Butchers',
    description: `This deck includes Obsidian Butchers but doesn’t include a way to spawn many one strength units. Consider including Rain of Frogs, Azure Hatchers, or Brood Sages and Poison Cards${dragonMessage}.`,
    highlight: ['F17', 'F8', 'F10', 'N43'],
  }
}

export default advice
