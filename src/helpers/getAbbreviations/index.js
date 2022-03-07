import abbreviate from '~/helpers/abbreviate'

const COMMON_ABBREVIATIONS = {
  AH: 'Amberhides',
  AoE: 'Area of Effect',
  ATE: 'Attack Trigger Effect',
  BH: 'Base Health',
  BS: 'Bladestorm',
  CB: 'Chillbeards',
  DB: ['Destructobots', 'Doppelbocks'],
  DF: 'Dreadfauns',
  DS: 'Dawnsparks',
  DTE: 'Death Trigger Effect',
  EF: 'Earthfathers',
  F2P: 'Free-to-play',
  FH: 'Frosthexers',
  FL: 'Fortress Level',
  FM: 'Fleshmenders',
  FS: 'Fusion Stones',
  GG: 'Goldgrubbers',
  HP: 'Health Point(s)',
  HC: 'Hero Crown(s)',
  HG: 'Hearthguards',
  HL: 'Heroes League',
  HS: 'Hero Score',
  IC: 'Ironclad',
  IF: 'Iceflakes',
  LL: 'Limelimbs',
  MW: 'Mystwives',
  OC: 'Overchargers',
  PP: 'Project PH03-NIX',
  P2P: 'Pay-to-play',
  P2W: 'Pay-to-win',
  QoL: 'Quality of Life',
  RL: 'Rimelings',
  RR: 'Reckless Rush',
  RW: 'Rockworkers',
  SB: ['Siegebreakers', 'Stormbound'],
  SC: ['Soulcrushers', 'Swarmcallers'],
  SF: 'Shadowfen',
  SM: 'Snowmasons',
  SS: 'Sleetstompers',
  SY: 'Sheepyard',
  STE: 'Survive Trigger Effect',
  SWCC: 'Stormbound Weekly Card Contest',
  WC: 'Wolfcloaks',
  WM: 'Windmakers',
  WP: 'Winter Pact',
}

const getAbbreviations = (cards, casing = 'NATURAL') => {
  const abbreviations = {}

  cards
    .filter(card => !card.token)
    .forEach(card => {
      const abbreviatedName = abbreviate(card.name)

      if (abbreviatedName.length === 1) return

      const key =
        casing === 'NATURAL' ? abbreviatedName : abbreviatedName.toLowerCase()

      if (typeof abbreviations[key] === 'undefined') {
        abbreviations[key] = []
      }

      abbreviations[key].push(card.name)
    })

  for (const abbreviation in COMMON_ABBREVIATIONS) {
    const value = COMMON_ABBREVIATIONS[abbreviation]
    const terms = Array.isArray(value) ? value : [value]

    terms.forEach(term => {
      const key =
        casing === 'NATURAL' ? abbreviation : abbreviation.toLowerCase()

      if (typeof abbreviations[key] === 'undefined') {
        abbreviations[key] = []
      }

      abbreviations[key].push(term)
    })
  }

  return abbreviations
}

export default getAbbreviations
