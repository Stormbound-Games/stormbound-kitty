import countCards from '~/helpers/countCards'

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
    getExpectations: (cards, criteria) => [
      countCards(cards, { ...criteria, rarity: 'common' }, false),
      0,
      0,
      0,
    ],
  },
  ANY_RARE: {
    label: 'any rare card',
    getExpectations: (cards, criteria) => [
      0,
      countCards(cards, { ...criteria, rarity: 'rare' }, false),
      0,
      0,
    ],
  },
  ANY_EPIC: {
    label: 'any epic card',
    getExpectations: (cards, criteria) => [
      0,
      0,
      countCards(cards, { ...criteria, rarity: 'epic' }, false),
      0,
    ],
  },
  ANY_LEGENDARY: {
    label: 'any legendary card',
    getExpectations: (cards, criteria) => [
      0,
      0,
      0,
      countCards(cards, { ...criteria, rarity: 'legendary' }, false),
    ],
  },
}
