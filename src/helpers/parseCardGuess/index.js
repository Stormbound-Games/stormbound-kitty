import { FACTIONS, UNIT_TYPES, RARITIES, TYPES } from '~/constants/game'
import handleSearchAlias from '~/helpers/handleSearchAlias'

const CARD_KEYS = [
  'name',
  'id',
  'sid',
  'type',
  'faction',
  'unitTypes',
  'rarity',
  'mana',
  'strength',
  'movement',
  'ability',
]

const parseCardGuess = (message, strict = false) => {
  message = message.toLowerCase()
  if (message === 'token') return ['token', true]
  if (RARITIES.includes(message)) return ['rarity', message]
  if (message.split(',').every(chunk => FACTIONS.includes(chunk)))
    return ['faction', message]
  if (TYPES.includes(message)) return ['type', message]
  if (UNIT_TYPES.includes(message))
    return [strict ? 'unitTypes' : 'unitType', message]
  const [key, value] = handleSearchAlias(message)
  if (CARD_KEYS.includes(key)) return [key, value]
  return []
}

export default parseCardGuess
