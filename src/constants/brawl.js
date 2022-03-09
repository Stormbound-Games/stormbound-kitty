import getMilestoneForCrowns from '~/helpers/getMilestoneForCrowns'

export const MILESTONES_LEGACY = [
  { crowns: 10, reward: 'HUMBLE_BOOK', rewardAmount: 1, cost: 0 },
  { crowns: 20, reward: 'RUBIES', rewardAmount: 5, cost: 20 },
  { crowns: 35, reward: 'CLASSIC_BOOK', rewardAmount: 1, cost: 50 },
  { crowns: 50, reward: 'FUSION_STONES', rewardAmount: 10, cost: 100 },
  { crowns: 70, reward: 'MYTHIC_BOOK', rewardAmount: 1, cost: 150 },
  { crowns: 95, reward: 'LEGENDARY_CARD', rewardAmount: 1, cost: 200 },
  { crowns: 125, reward: 'FUSION_STONES', rewardAmount: 50, cost: 250 },
  { crowns: 160, reward: 'RUBIES', rewardAmount: 250, cost: 300 },
  { crowns: 200, reward: 'LEGENDARY_CARD', rewardAmount: 5, cost: 400 },
  { crowns: 250, reward: 'FUSION_STONES', rewardAmount: 200, cost: 500 },
]

export const MILESTONES_CASUAL = [
  { crowns: 7, reward: 'COINS', rewardAmount: 10, cost: 0 },
  { crowns: 20, reward: 'HUMBLE_BOOK', rewardAmount: 1, cost: 5, ppCost: 5 },
  { crowns: 35, reward: 'RUBIES', rewardAmount: 5, cost: 10 },
  { crowns: 50, reward: 'FUSION_STONES', rewardAmount: 1, cost: 20 },
  { crowns: 70, reward: 'RUBIES', rewardAmount: 15, cost: 30 },
  { crowns: 95, reward: 'RARE_CARD', rewardAmount: 1, cost: 40 },
  { crowns: 125, reward: 'FUSION_STONES', rewardAmount: 7, cost: 50 },
  { crowns: 160, reward: 'RUBIES', rewardAmount: 60, cost: 65 },
  { crowns: 200, reward: 'RARE_CARD', rewardAmount: 5, cost: 80 },
  { crowns: 250, reward: 'RUBIES', rewardAmount: 200, cost: 100 },
]

export const MILESTONES_WARRIOR = [
  { crowns: 7, reward: 'COINS', rewardAmount: 20, cost: 0 },
  { crowns: 20, reward: 'HUMBLE_BOOK', rewardAmount: 1, cost: 10 },
  { crowns: 35, reward: 'NOBLE_BOOK', rewardAmount: 1, cost: 25 },
  { crowns: 50, reward: 'FUSION_STONES', rewardAmount: 4, cost: 50 },
  { crowns: 70, reward: 'HEROIC_BOOK', rewardAmount: 1, cost: 75, ppCost: 65 },
  { crowns: 95, reward: 'EPIC_CARD', rewardAmount: 2, cost: 100 },
  { crowns: 125, reward: 'FUSION_STONES', rewardAmount: 20, cost: 125 },
  { crowns: 160, reward: 'RUBIES', rewardAmount: 125, cost: 150 },
  { crowns: 200, reward: 'EPIC_CARD', rewardAmount: 7, cost: 200 },
  { crowns: 250, reward: 'RUBIES', rewardAmount: 500, cost: 250 },
]

export const MILESTONES_ULTIMATE = [
  { crowns: 7, reward: 'HUMBLE_BOOK', rewardAmount: 1, cost: 0 },
  { crowns: 20, reward: 'RUBIES', rewardAmount: 5, cost: 20 },
  { crowns: 35, reward: 'CLASSIC_BOOK', rewardAmount: 1, cost: 50 },
  { crowns: 50, reward: 'FUSION_STONES', rewardAmount: 10, cost: 100 },
  { crowns: 70, reward: 'MYTHIC_BOOK', rewardAmount: 1, cost: 150 },
  { crowns: 95, reward: 'LEGENDARY_CARD', rewardAmount: 1, cost: 200 },
  { crowns: 125, reward: 'FUSION_STONES', rewardAmount: 50, cost: 250 },
  { crowns: 160, reward: 'RUBIES', rewardAmount: 250, cost: 300 },
  { crowns: 200, reward: 'LEGENDARY_CARD', rewardAmount: 5, cost: 400 },
  { crowns: 250, reward: 'FUSION_STONES', rewardAmount: 200, cost: 500 },
]

export const BRAWL_MILESTONES = {
  CASUAL: MILESTONES_CASUAL,
  WARRIOR: MILESTONES_WARRIOR,
  ULTIMATE: MILESTONES_ULTIMATE,
  LEGACY: MILESTONES_LEGACY,
}

export const MATCH_STATUSES = {
  WON: 'W',
  FORFEIT: 'F',
  DRAW: 'D',
  LOST: 'L',
  SURRENDERED: 'S',
}

export const CROWN_REWARDS = {
  WON: 5,
  FORFEIT: 5,
  DRAW: 2,
  LOST: 1,
  SURRENDERED: 1,
}

export const VICTORY_BONUSES = {
  COINS: { label: 'Coins', id: 'C', isAvailable: () => true },
  RUBIES: {
    label: 'Rubies',
    id: 'R',
    isAvailable: ({ crowns }) => getMilestoneForCrowns(crowns).nextIndex >= 2,
  },
  FUSION_STONES: {
    label: 'Fusion stones',
    id: 'FS',
    isAvailable: ({ crowns }) => getMilestoneForCrowns(crowns).nextIndex >= 4,
  },
  FORTRESS_LEVEL: { label: 'Fortress up', id: 'FU', isAvailable: () => true },
  LIFE_UP: {
    label: '1 Life up',
    id: 'LU',
    isAvailable: ({ hearts }) => hearts.some(heart => !heart.isFull),
  },
  ALL_LIVES_UP: {
    label: 'All lives up',
    id: 'ALU',
    isAvailable: ({ hearts }) => hearts.some(heart => !heart.isFull),
  },
  ICE_ARMOR: {
    label: 'Ice armor',
    id: 'IA',
    isAvailable: meta =>
      meta.hearts.some(heart => heart.isFull && !heart.isProtected),
  },
  RUSTY_SLOT: {
    label: 'Rusty slot',
    id: 'IS',
    isAvailable: ({ hearts }) => hearts.length < 5,
  },
  GOLD_SLOT: {
    label: 'Slot solidify',
    id: 'GS',
    isAvailable: ({ hearts }) => hearts.some(heart => !heart.isPermanent),
  },
}
