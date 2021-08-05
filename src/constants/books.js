import countCards from '../helpers/countCards'

export const BOOKS = {
  MYTHIC: {
    percentiles: [0, 0, 0.7, 0.3],
    draws: 6,
  },
  HEROIC: {
    percentiles: [0, 0.7, 0.25, 0.05],
    draws: 6,
  },
  CLASSIC: {
    percentiles: [0.7, 0.25, 0.04, 0.01],
    draws: 6,
  },
  NOBLE: {
    percentiles: [0.7, 0.25, 0.04, 0.01],
    draws: 3,
  },
  HUMBLE: {
    percentiles: [0.7, 0.25, 0.04, 0.01],
    draws: 1,
  },
  PIRATE: {
    only: { race: 'pirate' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
  },
  FELINE: {
    only: { race: 'feline' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
  },
  ELDER: {
    only: { elder: true },
    percentiles: [0, 0.6, 0.35, 0.05],
    draws: 3,
  },
  DRAGON: {
    only: { race: 'dragon' },
    percentiles: [0.2, 0.6, 0.15, 0.05],
    draws: 3,
  },
  ARCHDRAGON: {
    only: { race: 'dragon' },
    percentiles: [0, 0, 0.7, 0.3],
    draws: 3,
  },
  STRUCTURE: {
    only: { type: 'structure' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
  },
  CHAOS: {
    only: { ability: /random/ },
    percentiles: [0.25, 0.25, 0.25, 0.25],
    draws: 3,
  },
  LEGENDS: {
    only: { rarity: 'legendary' },
    percentiles: [0, 0, 0, 1],
    draws: 3,
  },
  MAGIC: {
    only: { type: 'spell' },
    percentiles: [0.5, 0.3, 0.2, 0],
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
