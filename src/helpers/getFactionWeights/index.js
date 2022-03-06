import { FACTIONS } from '~/constants/game'
import { getLongFaction } from '~/helpers/encoding'

const getFactionWeights = (brawls, modifier) => {
  const factions = Object.keys(FACTIONS).filter(
    faction => faction !== 'neutral'
  )

  if (modifier === 'NONE')
    return factions.map(faction => ({ id: faction, weight: 1 }))

  const brawl = brawls.find(brawl => brawl.id === modifier)
  const brawlFaction = getLongFaction(brawl.cardId.slice(0, 1))

  return factions.map(faction => ({
    id: faction,
    weight: faction === brawlFaction ? 12 : 1,
  }))
}

export default getFactionWeights
