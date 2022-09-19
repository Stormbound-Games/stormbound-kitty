import { isSbId } from '~/helpers/convertDeckId'
import { base64Decode } from '~/helpers/base64'

const getFactionFromDeckID = id => {
  // If the deck ID is a Stormbound ID, the faction is encoded as a number at
  // the very start of the payload.
  if (isSbId(id)) {
    const value = base64Decode(id)
    const factions = ['neutral', 'swarm', 'winter', 'ironclad', 'shadowfen']
    const identifier = Number(value[0])

    return factions[identifier] || 'neutral'
  }

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
