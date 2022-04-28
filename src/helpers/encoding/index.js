import {
  FACTIONS as FACTIONS_LONG,
  TYPES as TYPES_LONG,
  RARITIES as RARITIES_LONG,
  UNIT_TYPES as UNIT_TYPES_LONG,
  CURRENCIES as CURRENCIES_LONG,
} from '~/constants/game'
import { MATCH_STATUSES, VICTORY_BONUSES } from '~/constants/brawl'

const UNIT_TYPES_SHORT = [
  'A',
  'C',
  'D',
  'W',
  'L',
  'F',
  'E',
  'H',
  'K',
  'P',
  'R',
  'O',
  'S',
  'T',
  'U',
]
const RARITIES_SHORT = ['C', 'R', 'E', 'L']
const TYPES_SHORT = ['U', 'S', 'C']
const FACTIONS_SHORT = ['N', 'W', 'I', 'F', 'S']
const CURRENCIES_SHORT = ['C', 'R', 'S']
const MATCH_STATUSES_LONG = Object.keys(MATCH_STATUSES)
const MATCH_STATUSES_SHORT = Object.values(MATCH_STATUSES)
const VICTORY_BONUSES_LONG = Object.keys(VICTORY_BONUSES)
const VICTORY_BONUSES_SHORT = Object.values(VICTORY_BONUSES).map(b => b.id)

export const getShortFaction = faction =>
  FACTIONS_SHORT[FACTIONS_LONG.indexOf(faction)] || 'N'
export const getLongFaction = faction =>
  FACTIONS_LONG[FACTIONS_SHORT.indexOf(faction)] || 'neutral'

export const getShortType = type => TYPES_SHORT[TYPES_LONG.indexOf(type)] || 'U'
export const getLongType = type =>
  TYPES_LONG[TYPES_SHORT.indexOf(type)] || 'unit'

export const getShortRarity = rarity =>
  RARITIES_SHORT[RARITIES_LONG.indexOf(rarity)] || 'C'
export const getLongRarity = rarity =>
  RARITIES_LONG[RARITIES_SHORT.indexOf(rarity)] || 'common'

export const getShortUnitType = unitType =>
  UNIT_TYPES_SHORT[UNIT_TYPES_LONG.indexOf(unitType)] || unitType || ''
export const getLongUnitType = unitType =>
  UNIT_TYPES_LONG[UNIT_TYPES_SHORT.indexOf(unitType)] || unitType || ''

export const getShortCurrency = currency =>
  CURRENCIES_SHORT[CURRENCIES_LONG.indexOf(currency)] || 'C'
export const getLongCurrency = currency =>
  CURRENCIES_LONG[CURRENCIES_SHORT.indexOf(currency)] || 'coins'

export const getShortMatchStatus = status =>
  MATCH_STATUSES_SHORT[MATCH_STATUSES_LONG.indexOf(status)] || ''
export const getLongMatchStatus = status =>
  MATCH_STATUSES_LONG[MATCH_STATUSES_SHORT.indexOf(status)] || ''

export const getShortVictoryBonus = status =>
  VICTORY_BONUSES_SHORT[VICTORY_BONUSES_LONG.indexOf(status)] || ''
export const getLongVictoryBonus = status =>
  VICTORY_BONUSES_LONG[VICTORY_BONUSES_SHORT.indexOf(status)] || ''
