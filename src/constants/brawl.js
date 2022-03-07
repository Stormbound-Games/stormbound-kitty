import getMilestoneForCrowns from '~/helpers/getMilestoneForCrowns'

export const BRAWLS = [
  {
    id: 'DWARF_MANA',
    label: 'Dwarves -2 mana',
    title: 'Natural Sprint',
    cardId: 'W23',
  },
  {
    id: 'PIRATE_MANA',
    label: 'Pirates -2 mana',
    title: 'Pirate Treasure',
    cardId: 'N77',
  },
  {
    id: 'RAVEN_MOVEMENT',
    label: 'Raven +1 movement',
    title: 'Scavengers',
    cardId: 'F23',
  },
  {
    id: 'STRUCTURE_MANA',
    label: 'Structures =2 mana',
    title: 'Aftershock',
    cardId: 'N35',
  },
  {
    id: 'RODENT_STRENGTH',
    label: 'Rodents +3 strength',
    title: 'Small Plague',
    cardId: 'I2',
  },
  {
    id: 'PIRATE_MOVEMENT',
    label: 'Pirates =2 movement',
    title: 'Pirate Mercenaries',
    cardId: 'N58',
  },
  {
    id: 'FELINE_STRENGTH',
    label: 'Felines +2 strength',
    title: 'Noble Coalition',
    cardId: 'N69',
  },
  {
    id: 'SATYR_MOVEMENT',
    label: 'Satyrs +1 movement',
    title: 'Self-control',
    cardId: 'S3',
  },
  {
    id: 'SPELL_MANA',
    label: 'Spells -2 mana',
    title: 'Eye of the Tempest',
    cardId: 'N48',
  },
  {
    id: 'FROSTLING_STRENGTH',
    label: 'Frostlings +4 strength',
    title: 'Goddess Boon',
    cardId: 'W10',
  },
  {
    id: 'TOAD_MANA',
    label: 'Toads =2 mana',
    title: 'Freedom Fight',
    cardId: 'F12',
  },
  {
    id: 'ELDER_STRENGTH',
    label: 'Elders +3 strength',
    title: 'Elderly Wisdom',
    cardId: 'N76',
  },
  {
    id: 'CONSTRUCT_MOVEMENT',
    label: 'Construct =2 movement',
    title: 'Lucrative Project',
    cardId: 'I22',
  },
  {
    id: 'KNIGHT_MANA',
    label: 'Knights -2 mana',
    title: 'Heavy Metal',
    cardId: 'N59',
  },
  {
    id: 'DRAGON_MOVEMENT',
    label: 'Dragons +1 movement',
    title: 'Unleashed Fury',
    cardId: 'N46',
  },
  {
    id: 'UNDEAD_STRENGTH',
    label: 'Undead +2 strength',
    title: 'Swift Demise',
    cardId: 'S21',
  },
  {
    id: 'HERO_STRENGTH',
    label: 'Heroes +3 strength',
    title: 'Heroic Deeds',
    cardId: 'N8',
  },
  {
    id: 'PURE_AMALGAMATION',
    label: 'Randomly merged deck',
    title: 'Pure Amalgamation',
    cardId: 'N48',
  },
  {
    id: 'FIGHTS_OF_THREES',
    label: 'Max 3 friendly units',
    title: 'Fights of Threes',
    cardId: 'N50',
  },
  {
    id: 'THIN_NO_MANS_LAND',
    label: 'High frontline',
    title: 'Thin No-Man’s Land',
    cardId: 'S17',
  },
  {
    id: 'STUNNING_ATTACK',
    label: 'Confusion on damage',
    title: 'Stunning attack',
    cardId: 'N61',
  },
  {
    id: 'RESERVE_MANAGEMENT',
    label: 'Unspent mana is carried over',
    title: 'Reserve Management',
    cardId: 'W19',
  },
  {
    id: 'CHAOS_UNLEASHED',
    label: 'Units get a random status effect upon play',
    title: 'Chaos Unleashed',
    cardId: 'I12',
  },
  {
    id: 'STEADY_GROWTH',
    label: 'Cards level up when cycled',
    title: 'Steady Growth',
    cardId: 'N15',
  },
  {
    id: 'THE_GREAT_MILL',
    label: 'Hand is always full',
    title: 'The Great Mill',
    cardId: 'N33',
  },
]

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

export const CYCLE_START = new Date(2021, 3, 1, 9, 0)

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
