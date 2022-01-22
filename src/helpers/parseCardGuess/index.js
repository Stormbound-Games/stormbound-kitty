import { FACTIONS, RACES, RARITIES, TYPES } from '~/constants/game'
import handleSearchAlias from '~/helpers/handleSearchAlias'
import getRawCardData from '~/helpers/getRawCardData'

const SAMPLE_CARD = getRawCardData('N1')

const parseCardGuess = message => {
  message = message.toLowerCase()
  if (message === 'hero') return ['hero', true]
  if (message === 'elder') return ['elder', true]
  if (message === 'ancient') return ['ancient', true]
  if (Object.keys(RARITIES).includes(message)) return ['rarity', message]
  if (message.split(',').every(chunk => Object.keys(FACTIONS).includes(chunk)))
    return ['faction', message]
  if (Object.keys(TYPES).includes(message)) return ['type', message]
  if (Object.keys(RACES).includes(message)) return ['race', message]
  const [key, value] = handleSearchAlias(message)
  if (Object.keys(SAMPLE_CARD).includes(key)) return [key, value]
  return []
}

export default parseCardGuess
