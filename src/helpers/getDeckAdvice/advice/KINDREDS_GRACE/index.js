const SAME_RACE_THRESHOLD = 3

export default cards => {
  const cardIds = cards.map(card => card.id)
  const hasRainOfFrogs = cardIds.includes('F8')
  const hasAzureHatchers = cardIds.includes('F10')
  const hasKindredsGrace = cardIds.includes('N40')
  const { faction } = cards.find(card => card.faction !== 'neutral') || {}
  let deckRaces = {}
  cards.forEach(card => {
    if (card.race === null) {
      return
    }
    if (!deckRaces[card.race]) {
      deckRaces[card.race] = 1
    } else {
      deckRaces[card.race] += 1
    }
  })
  const maxRaceNum = Object.values(deckRaces).reduce(
    (a, b) => Math.max(a, b),
    0
  )
  const shadowfenConditions =
    faction === 'shadowfen' && (hasRainOfFrogs || hasAzureHatchers)
  const shadowfenMessage =
    faction === 'shadowfen' ? `, or Rain of Frogs or Azure Hatchers` : ''

  // For Kindred’s Grace to be considered efficient, it requires 3 units
  // of the same race to be represented or to include Rain of Frogs or
  // Azure Hatchers.

  if (
    !hasKindredsGrace ||
    maxRaceNum >= SAME_RACE_THRESHOLD ||
    shadowfenConditions
  )
    return null

  return {
    name: 'Inefficient Kindred’s Grace',
    description: `This deck includes Kindred’s Grace but doesn’t include enough units of the same race to be efficient. Consider including more units of the same race${shadowfenMessage}.`,
    highlight: ['N40'],
  }
}
