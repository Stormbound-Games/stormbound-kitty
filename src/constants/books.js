import countCards from '~/helpers/countCards'

export const BOOKS = {
  MYTHIC: {
    percentiles: [0, 0, 0.7, 0.3],
    draws: 6,
    cost: { type: 'RUBIES', amount: 80 },
  },
  HEROIC: {
    percentiles: [0, 0.7, 0.25, 0.05],
    draws: 6,
    cost: { type: 'RUBIES', amount: 40 },
  },
  CLASSIC: {
    percentiles: [0.7, 0.25, 0.04, 0.01],
    draws: 6,
    cost: { type: 'RUBIES', amount: 20 },
  },
  NOBLE: {
    percentiles: [0.7, 0.25, 0.04, 0.01],
    draws: 3,
    cost: { type: 'COINS', amount: 100 },
  },
  HUMBLE: {
    percentiles: [0.7, 0.25, 0.04, 0.01],
    draws: 1,
    cost: { type: 'AD', amount: 1 },
  },
  PIRATE: {
    only: { race: 'pirate' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  KNIGHT: {
    only: { race: 'knight' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  FELINE: {
    only: { race: 'feline' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  ELDER: {
    only: { elder: true },
    percentiles: [0, 0.6, 0.35, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  DRAGON: {
    only: { race: 'dragon' },
    percentiles: [0.2, 0.6, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  ARCHDRAGON: {
    only: { race: 'dragon' },
    percentiles: [0, 0, 0.7, 0.3],
    draws: 3,
    cost: { type: 'RUBIES', amount: 90 },
  },
  STRUCTURE: {
    only: { type: 'structure' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  CHAOS: {
    only: { ability: /random/ },
    percentiles: [0.25, 0.25, 0.25, 0.25],
    draws: 3,
    cost: { type: 'RUBIES', amount: 50 },
  },
  LEGENDS: {
    only: { rarity: 'legendary' },
    percentiles: [0, 0, 0, 1],
    draws: 3,
    cost: { type: 'RUBIES', amount: 120 },
  },
  MAGIC: {
    only: { type: 'spell' },
    percentiles: [0.5, 0.3, 0.2, 0],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  CONSTRUCT: {
    only: { race: 'construct' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  RODENT: {
    only: { race: 'rodent' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  FROSTLING: {
    only: { race: 'frostling' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  DWARF: {
    only: { race: 'dwarf' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  UNDEAD: {
    only: { race: 'undead' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  SATYR: {
    only: { race: 'satyr' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  TOAD: {
    only: { race: 'toad' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  RAVEN: {
    only: { race: 'raven' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
  },
  TEMPLE: {
    only: { name: /^Temple/ },
    percentiles: [0.35, 0.3, 0.2, 0.15],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
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
