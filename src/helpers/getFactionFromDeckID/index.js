const getFactionFromDeckID = id => {
  const factions = [
    id.includes('f') && 'shadowfen',
    id.includes('i') && 'ironclad',
    id.includes('s') && 'swarm',
    id.includes('w') && 'winter',
  ].filter(Boolean)

  if (factions.length === 1) return factions[0]
  if (factions.length > 1) return 'multi-factions'
  return 'neutral'
}

export default getFactionFromDeckID
