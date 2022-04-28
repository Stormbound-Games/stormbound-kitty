const FUSION_STONES_BASE = {
  name: 'Fusion Stones',
  unitTypes: ['resource'],
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
  image:
    'https://cdn.sanity.io/images/5hlpazgd/production/81ba7ec65039829993017554649296f280415ce4-236x301.png',
}

const FUSION_STONES_RARE = {
  ...FUSION_STONES_BASE,
  id: 'R2',
  ability: '10 Fusion Stones',
  rarity: 'rare',
  image:
    'https://cdn.sanity.io/images/5hlpazgd/production/ef00952b9147d5825a83a4bda4c6d414af867420-266x300.png',
}

const FUSION_STONES_EPIC = {
  ...FUSION_STONES_BASE,
  id: 'R3',
  ability: '25 Fusion Stones',
  rarity: 'epic',
  image:
    'https://cdn.sanity.io/images/5hlpazgd/production/65fe67820b65923336b98040262e693d153c3434-275x300.png',
}

const FUSION_STONES_LEGENDARY = {
  ...FUSION_STONES_BASE,
  id: 'R4',
  ability: '50 Fusion Stones',
  rarity: 'legendary',
  image:
    'https://cdn.sanity.io/images/5hlpazgd/production/67fbdc5e38c22f7f57b1748b3738987c4b84da38-235x300.png',
}

const fs = [
  FUSION_STONES_COMMON,
  FUSION_STONES_RARE,
  FUSION_STONES_EPIC,
  FUSION_STONES_LEGENDARY,
]

export default fs
