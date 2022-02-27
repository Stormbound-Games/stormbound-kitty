const getFactions = cards =>
  [...new Set(cards.map(card => card.faction))].filter(
    faction => faction !== 'neutral'
  )

const advice = cards => {
  const factions = getFactions(cards)

  if (factions.length <= 1) return null

  return {
    name: 'Multi-factions',
    description: `This deck counts ${factions.length} factions, which is not technically permitted in Stormbound. This deck cannot be played in game.`,
  }
}

export default advice
