import { FACTIONS, RACES, RARITIES, TYPES } from '~/constants/game'
import handleSearchAlias from '~/helpers/handleSearchAlias'

const CARD_KEYS = [
  'name',
  'id',
  'sid',
  'type',
  'faction',
  'race',
  'rarity',
  'mana',
  'strength',
  'movement',
  'ability',
]

const parseCardGuess = message => {
  message = message.toLowerCase()
  if (message === 'hero') return ['hero', true]
  if (message === 'elder') return ['elder', true]
  if (message === 'ancient') return ['ancient', true]
  if (message === 'token') return ['token', true]
  if (RARITIES.includes(message)) return ['rarity', message]
  if (message.split(',').every(chunk => FACTIONS.includes(chunk)))
    return ['faction', message]
  if (TYPES.includes(message)) return ['type', message]
  if (RACES.includes(message)) return ['race', message]
  const [key, value] = handleSearchAlias(message)
  if (CARD_KEYS.includes(key)) return [key, value]
  return []
}

export default parseCardGuess
