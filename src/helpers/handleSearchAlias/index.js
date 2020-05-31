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
    case 'd1':
    case 'diamond':
      return ['category', 'DIAMOND_1']
    case 'equal':
    case 'tournament':
    case 'tourney':
      return ['category', 'EQUALS']
    default:
      return []
  }
}
