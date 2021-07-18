export default term => {
  switch (term.toLowerCase()) {
    case 'struct':
      return ['type', 'structure']
    case 'ic':
    case 'red':
      return ['faction', 'ironclad']
    case 'sf':
    case 'green':
      return ['faction', 'shadowfen']
    case 'w':
    case 'wp':
    case 'blue':
      return ['faction', 'winter']
    case 'sw':
    case 'yellow':
      return ['faction', 'swarm']
    case 'n':
    case 'grey':
    case 'gray':
      return ['faction', 'neutral']
    case 'd1': // legacy
    case 'hl':
    case 'heroes':
    case 'diamond':
      return ['tags', ['HIGH_LEVELS']]
    case 'equal':
    case 'tournament':
    case 'tourney':
      return ['tags', ['EQUALS']]
    default:
      return []
  }
}
