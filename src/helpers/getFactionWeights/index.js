import { BRAWLS } from '../../constants/brawl'
import { FACTIONS } from '../../constants/game'
import { getLongFaction } from '../encoding'

export default modifier => {
  const factions = Object.keys(FACTIONS).filter(
    faction => faction !== 'neutral'
  )

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
