export const BRAWLS = [
  {
    id: 'HERO_STRENGTH',
    label: 'Heroes +3 strength',
    title: 'Heroic Deeds',
    cardId: 'N8',
  },
  {
    id: 'DWARF_MANA',
    label: 'Dwarves -2 mana',
    title: 'Natural Sprint',
    cardId: 'W23',
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
    title: 'Goddess’ Boon',
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
]

export const MILESTONES = [
  { crowns: 10, reward: 'HUMBLE_BOOK', rewardAmount: 1, cost: 0 },
  { crowns: 20, reward: 'RUBIES', rewardAmount: 5, cost: 20 },
  { crowns: 35, reward: 'CLASSIC_TOME', rewardAmount: 1, cost: 50 },
  { crowns: 50, reward: 'FUSION_STONES', rewardAmount: 10, cost: 100 },
  { crowns: 70, reward: 'MYTHIC_TOME', rewardAmount: 1, cost: 150 },
  { crowns: 95, reward: 'LEGENDARY_CARD', rewardAmount: 1, cost: 200 },
  { crowns: 125, reward: 'FUSION_STONES', rewardAmount: 50, cost: 250 },
  { crowns: 160, reward: 'RUBIES', rewardAmount: 250, cost: 300 },
  { crowns: 200, reward: 'LEGENDARY_CARD', rewardAmount: 5, cost: 400 },
  { crowns: 250, reward: 'FUSION_STONES', rewardAmount: 200, cost: 500 },
]

export const MATCH_STATUSES = {
  WON: 'W',
  FORFEIT: 'F',
  LOST: 'L',
  SURRENDERED: 'S',
}

export const COIN_MULTIPLIERS = {
  STEAM: 10,
  MOBILE_WITH_ADS: 20,
  MOBILE_WITHOUT_ADS: 5,
}
