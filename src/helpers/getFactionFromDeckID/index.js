const getFactionFromDeckID = id => {
  if (id.includes('i')) return 'ironclad'
  if (id.includes('s')) return 'swarm'
  if (id.includes('f')) return 'shadowfen'
  if (id.includes('w')) return 'winter'
  return 'neutral'
}

export default getFactionFromDeckID
