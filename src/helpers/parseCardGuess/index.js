import { FACTIONS, RACES, RARITIES, TYPES } from '~/constants/game'
import handleSearchAlias from '~/helpers/handleSearchAlias'

const SAMPLE_CARD = {
  name: 'Green Prototypes',
  id: 'N1',
  sid: 'u007',
  type: 'unit',
  faction: 'neutral',
  race: 'construct',
  rarity: 'rare',
  image: 'green_prototypes.png',
  mana: 1,
  strength: '1/2/3/4/5',
  movement: 1,
  ability:
    'On death, *give 1/2/3/4/5* strength to a random surrounding *enemy* unit and *vitalize* it',
}

const parseCardGuess = message => {
  message = message.toLowerCase()
  if (message === 'hero') return ['hero', true]
  if (message === 'elder') return ['elder', true]
  if (message === 'ancient') return ['ancient', true]
  if (RARITIES.includes(message)) return ['rarity', message]
  if (message.split(',').every(chunk => FACTIONS.includes(chunk)))
    return ['faction', message]
  if (TYPES.includes(message)) return ['type', message]
  if (RACES.includes(message)) return ['race', message]
  const [key, value] = handleSearchAlias(message)
  if (Object.keys(SAMPLE_CARD).includes(key)) return [key, value]
  return []
}

export default parseCardGuess
