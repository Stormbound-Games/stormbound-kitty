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
    stonesForMissing: 10,
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

export const CHIP_CARDS = [
  'I15',
  'I28',
  'N35',
  'N44',
  'N91',
  'F28',
  'S13',
  'S18',
  'S22',
  'S31',
  'I19',
  'N45',
  'N81',
  'W21',
]
