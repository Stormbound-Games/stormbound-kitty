import {
  FACTIONS,
  TYPES,
  RARITIES,
  RACES,
  CURRENCIES,
} from '../../constants/game'

const RACES_LONG = Object.keys(RACES)
const RACES_SHORT = Object.values(RACES)
const RARITIES_LONG = Object.keys(RARITIES)
const RARITIES_SHORT = Object.values(RARITIES)
const TYPES_LONG = Object.keys(TYPES)
const TYPES_SHORT = Object.values(TYPES)
const FACTIONS_LONG = Object.keys(FACTIONS)
const FACTIONS_SHORT = Object.values(FACTIONS)
const CURRENCIES_LONG = Object.keys(CURRENCIES)
const CURRENCIES_SHORT = Object.values(CURRENCIES)

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

export const getShortRace = race => RACES_SHORT[RACES_LONG.indexOf(race)] || ''
export const getLongRace = race => RACES_LONG[RACES_SHORT.indexOf(race)] || ''

export const getShortCurrency = currency =>
  CURRENCIES_SHORT[CURRENCIES_LONG.indexOf(currency)] || 'C'
export const getLongCurrency = currency =>
  CURRENCIES_LONG[CURRENCIES_SHORT.indexOf(currency)] || 'coins'
