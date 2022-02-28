import countCards from '~/helpers/countCards'

export const BOOKS = {
  MYTHIC: {
    percentiles: [0, 0, 0.7, 0.3],
    draws: 6,
    cost: { type: 'RUBIES', amount: 80 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/a0a1fd0560771b309eb3acf91327970a86272473-403x629.png',
  },
  HEROIC: {
    percentiles: [0, 0.7, 0.25, 0.05],
    draws: 6,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/7e8eae1d46280bca4aa10a3b66deed48bde9ce00-403x629.png',
  },
  CLASSIC: {
    percentiles: [0.7, 0.25, 0.04, 0.01],
    draws: 6,
    cost: { type: 'RUBIES', amount: 20 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/0f97c9d53db507d7f30ddfc169cf7e9862864537-403x629.png',
  },
  NOBLE: {
    percentiles: [0.7, 0.25, 0.04, 0.01],
    draws: 3,
    cost: { type: 'COINS', amount: 100 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/745e1b03c85466e8d1b8e9214507e9523ba209bf-403x629.png',
  },
  HUMBLE: {
    percentiles: [0.7, 0.25, 0.04, 0.01],
    draws: 1,
    cost: { type: 'AD', amount: 1 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/7600d8a336dc73a7b7a0d422f7097244aad3e6de-403x629.png',
  },
  PIRATE: {
    only: { race: 'pirate' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/a2c2abd33be4774e796eaaea2fd716e5686e5283-403x629.png',
  },
  KNIGHT: {
    only: { race: 'knight' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/989c19c8cae71b4a2964b7f79a48aa893b4d2c40-403x629.png',
  },
  FELINE: {
    only: { race: 'feline' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/53d6e8c2fc3a7ed2978bd954f4650ec770cd3c43-403x629.png',
  },
  ELDER: {
    only: { elder: true },
    percentiles: [0, 0.6, 0.35, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/13357e9cc0929b44cca5b12de4c22c1269135551-403x629.png',
  },
  DRAGON: {
    only: { race: 'dragon' },
    percentiles: [0.2, 0.6, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/f8ec8759f9e7bc3cda0585eb60c0ca1e16404be1-403x629.png',
  },
  ARCHDRAGON: {
    only: { race: 'dragon' },
    percentiles: [0, 0, 0.7, 0.3],
    draws: 3,
    cost: { type: 'RUBIES', amount: 90 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/dfac2be9406a4c36b7f46bc11229a5917e925883-403x629.png',
  },
  STRUCTURE: {
    only: { type: 'structure' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/815c81d007f77451a116572d703c35b38f650a9a-403x629.png',
  },
  CHAOS: {
    only: { ability: /random/ },
    percentiles: [0.25, 0.25, 0.25, 0.25],
    draws: 3,
    cost: { type: 'RUBIES', amount: 50 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/f2bdeb8b3a3e5af17ab6426e49d0717d102ed863-403x629.png',
  },
  LEGENDS: {
    only: { rarity: 'legendary' },
    percentiles: [0, 0, 0, 1],
    draws: 3,
    cost: { type: 'RUBIES', amount: 120 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/09bcedfe919a53c75f992792398f997f65e18552-403x629.png',
  },
  MAGIC: {
    only: { type: 'spell' },
    percentiles: [0.5, 0.3, 0.2, 0],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/e3b9b1785a464f1b262ed4b46858bed3ea19eb7c-396x611.png',
  },
  CONSTRUCT: {
    only: { race: 'construct' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/bfc8de1c21cc8c31ed42eafb9ca7bec7e67d56ba-403x629.png',
  },
  RODENT: {
    only: { race: 'rodent' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/3725b039863e3bf045c7488410aa3fbeb2b28a17-403x629.png',
  },
  FROSTLING: {
    only: { race: 'frostling' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/1c2c98a08d7e0d47f6e59b70d87e87e5f7a90df1-403x629.png',
  },
  DWARF: {
    only: { race: 'dwarf' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/ce46eaf9700caa4ef43f60f97a2a079ded8f31cd-403x629.png',
  },
  UNDEAD: {
    only: { race: 'undead' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/f4d2e5303016d62f015b7fb558ae56d335b8d559-403x629.png',
  },
  SATYR: {
    only: { race: 'satyr' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/81d58e721b4e73c0b313222bfc3e6c77e1c9762a-403x629.png',
  },
  TOAD: {
    only: { race: 'toad' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/e82d3fb986abd171028df6c060841b3ba1902a49-403x629.png',
  },
  RAVEN: {
    only: { race: 'raven' },
    percentiles: [0.5, 0.3, 0.15, 0.05],
    draws: 3,
    cost: { type: 'RUBIES', amount: 40 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/08f73775fb494ab45c5a5e22bc008697c88dcda5-403x629.png',
  },
  TEMPLE: {
    only: { name: /^Temple/ },
    percentiles: [0.35, 0.3, 0.2, 0.15],
    draws: 3,
    cost: { type: 'RUBIES', amount: 60 },
    image:
      'https://cdn.sanity.io/images/5hlpazgd/production/84562a3bf2d31750073d4b458dbeeddb9e7d8274-403x629.png',
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
