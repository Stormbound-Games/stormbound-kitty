import { BRAWLS } from '../constants/brawl'
import { getLongFaction } from '../helpers/encoding'

export default modifier => {
  const factions = ['winter', 'ironclad', 'shadowfen', 'swarm']

  if (modifier === 'NONE')
    return factions.map(faction => ({ id: faction, weight: 1 }))

  const brawlFaction = getLongFaction(
    BRAWLS.find(brawl => brawl.id === modifier).cardId.slice(0, 1)
  )

  return factions.map(faction => ({
    id: faction,
    weight: faction === brawlFaction ? 12 : 1,
  }))
}
