import countCards from '../helpers/countCards'

export const FACTIONS = {
  neutral: 'N',
  winter: 'W',
  ironclad: 'I',
  shadowfen: 'F',
  swarm: 'S',
}

export const TYPES = { unit: 'U', structure: 'S', spell: 'C' }

export const RARITIES = { common: 'C', rare: 'R', epic: 'E', legendary: 'L' }

export const RACES = {
  ancient: 'A',
  construct: 'C',
  dragon: 'D',
  dwarf: 'W',
  frostling: 'F',
  feline: 'E',
  knight: 'K',
  pirate: 'P',
  raven: 'R',
  rodent: 'O',
  satyr: 'S',
  toad: 'T',
  undead: 'U',
}

export const CURRENCIES = {
  coins: 'C',
  rubies: 'R',
  stones: 'S',
}

export const UPGRADE_COST = [50, 100, 300, 1000]
export const RARITY_COPIES = {
  common: {
    copies: [2, 5, 12, 30],
    stonesPerMissingCopy: 3,
    stonesForMissing: 5,
    coinsPerExtraCopy: 15,
  },
  rare: {
    copies: [2, 4, 10, 24],
    stonesPerMissingCopy: 7,
    stonesForMissing: 12,
    coinsPerExtraCopy: 30,
  },
  epic: {
    copies: [1, 3, 7, 18],
    stonesPerMissingCopy: 15,
    stonesForMissing: 25,
    coinsPerExtraCopy: 70,
  },
  legendary: {
    copies: [1, 2, 5, 12],
    stonesPerMissingCopy: 30,
    stonesForMissing: 50,
    coinsPerExtraCopy: 150,
  },
}

export const BOOKS = {
  MYTHIC: { percentiles: [0, 0, 0.7, 0.3], draws: 6 },
  HEROIC: { percentiles: [0, 0.7, 0.25, 0.05], draws: 6 },
  CLASSIC: { percentiles: [0.7, 0.25, 0.04, 0.01], draws: 6 },
  NOBLE: { percentiles: [0.7, 0.25, 0.04, 0.01], draws: 3 },
  HUMBLE: { percentiles: [0.7, 0.25, 0.04, 0.01], draws: 1 },
  PIRATE: {
    only: { race: 'pirate' },
    percentiles: [0.55, 0.25, 0.15, 0.05],
    draws: 3,
  },
  FELINE: {
    only: { race: 'feline' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
  },
  ELDER: {
    only: { elder: true },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
  },
  DRAGON: {
    only: { race: 'dragon' },
    percentiles: [0.2, 0.6, 0.2, 0],
    draws: 3,
  },
  ARCHDRAGON: {
    only: { race: 'dragon' },
    percentiles: [0, 0, 0.7, 0.3],
    draws: 3,
  },
}

export const EXPECTATIONS = {
  FUSION_STONES: {
    label: 'Fusion stones',
    getExpectations: () => [1, 1, 1, 1],
  },
  SPECIFIC_COMMON: {
    label: 'a specific common card',
    getExpectations: () => [1, 0, 0, 0],
  },
  SPECIFIC_RARE: {
    label: 'a specific rare card',
    getExpectations: () => [0, 1, 0, 0],
  },
  SPECIFIC_EPIC: {
    label: 'a specific epic card',
    getExpectations: () => [0, 0, 1, 0],
  },
  SPECIFIC_LEGENDARY: {
    label: 'a specific legendary card',
    getExpectations: () => [0, 0, 0, 1],
  },
  ANY_COMMON: {
    label: 'any common card',
    getExpectations: criteria => [
      countCards({ ...criteria, rarity: 'common' }, false),
      0,
      0,
      0,
    ],
  },
  ANY_RARE: {
    label: 'any rare card',
    getExpectations: criteria => [
      0,
      countCards({ ...criteria, rarity: 'rare' }, false),
      0,
      0,
    ],
  },
  ANY_EPIC: {
    label: 'any epic card',
    getExpectations: criteria => [
      0,
      0,
      countCards({ ...criteria, rarity: 'epic' }, false),
      0,
    ],
  },
  ANY_LEGENDARY: {
    label: 'any legendary card',
    getExpectations: criteria => [
      0,
      0,
      0,
      countCards({ ...criteria, rarity: 'legendary' }, false),
    ],
  },
}

export const CHIP_CARDS = [
  'I15',
  'N44',
  'F28',
  'S13',
  'S18',
  'I19',
  'N45',
  'W21',
]
