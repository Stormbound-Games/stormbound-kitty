const FUSION_STONES_BASE = {
  name: 'Fusion Stones',
  race: 'resource',
  level: 1,
  type: 'unit',
  faction: 'neutral',
  mana: null,
  strength: null,
  movement: null,
}

const FUSION_STONES_COMMON = {
  ...FUSION_STONES_BASE,
  id: 'R1',
  ability: '5 Fusion Stones',
  rarity: 'common',
  image: 'stones_common.png',
}

const FUSION_STONES_RARE = {
  ...FUSION_STONES_BASE,
  id: 'R2',
  ability: '10 Fusion Stones',
  rarity: 'rare',
  image: 'stones_rare.png',
}

const FUSION_STONES_EPIC = {
  ...FUSION_STONES_BASE,
  id: 'R3',
  ability: '25 Fusion Stones',
  rarity: 'epic',
  image: 'stones_epic.png',
}

const FUSION_STONES_LEGENDARY = {
  ...FUSION_STONES_BASE,
  id: 'R4',
  ability: '50 Fusion Stones',
  rarity: 'legendary',
  image: 'stones_legendary.png',
}

const fs = [
  FUSION_STONES_COMMON,
  FUSION_STONES_RARE,
  FUSION_STONES_EPIC,
  FUSION_STONES_LEGENDARY,
]

export default fs
