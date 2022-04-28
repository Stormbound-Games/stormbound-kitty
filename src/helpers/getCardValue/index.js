import getResolvedCardData from '~/helpers/getResolvedCardData'
import getEffectiveSpeed from '~/helpers/getEffectiveSpeed'
import { UNIT_TYPES } from '~/constants/game'

export const MAX_MANA = 30
export const MAX_TILES = 10
export const VALUED_CARDS =
  'N89,N1,N2,N66,N90,N3,N4,N5,N6,N86,N62,N67,N7,N8,N9,N10,N11,N12,N13,N14,N61,N23,N88,N24,N15,N73,N63,N16,N17,N18,N87,N19,N94,N59,N20,N21,N31,N22,N93,N75,N41,N64,N91,N71,N65,N25,N78,N26,N27,N28,N29,N30,N79,N82,N60,N83,N32,N69,N33,N34,N35,N36,N49,N74,N37,N51,N39,N40,N42,N43,N44,N45,N76,N72,N46,N68,N47,N70,N50,N55,N52,N53,N92,N54,N57,N84,N56,N58,T15,T1,T11,T10,T14,T13,T2,T3,T12,T4,T5,T6,T7,T8,T9,W1,W2,W31,W3,W4,W5,W7,W12,W28,W6,W13,W14,W15,W16,W25,W10,W17,W20,W27,W18,W26,W21,W22,W19,W23,I1,I4,I5,I3,I30,I7,I8,I9,I10,I11,I13,I6,I14,I15,I27,I20,I25,I12,I16,I17,I18,I22,I19,I23,I28,I21,I24,I26,F1,F2,F3,F8,F4,F5,F27,F6,F7,F25,F9,F10,F24,F11,F12,F13,F14,F15,F16,F17,F18,F19,F20,F21,F22,F28,F26,F23,S1,S24,S2,S3,S4,S5,S25,S7,S8,S9,S10,S11,S12,S13,S14,S15,S16,S17,S18,S19,S28,S26,S22,S23,S21'.split(
    ','
  )

const getSpeedFactor = movement => {
  if (!movement) return 0.5
  if (movement <= 1) return movement
  if (movement <= 2) return 1.5
  if (movement <= 3) return 1.75
  if (movement > 3) return 2
  return 1
}

const parseAbility = (ability, index = 0) =>
  ability.match(/(\d+)/g).map(Number)[index]

const getCardValue = (cardsIndex, id, level = 1) => {
  if (!VALUED_CARDS.includes(id)) return null

  const cardData = getResolvedCardData(cardsIndex, { id, level })

  if (!cardData) return null

  const { strength, mana, ability, type, movement } = cardData
  const speed = getSpeedFactor(getEffectiveSpeed(cardData))
  const { strength: MAX_STRENGTH } = getResolvedCardData(cardsIndex, {
    id: 'I26',
    level,
  })

  switch (id) {
    case 'N1': /* Green Prototypes */ {
      return [0, (strength / mana) * speed]
    }
    case 'N2': /* Summon Militia */ {
      const value = parseAbility(ability)
      return [(value / mana) * speed, (value / mana) * speed]
    }
    case 'N5': /* Northsea Dog */
    case 'N6': /* Spare Dragonling */
    case 'N7': /* Brothers in Arms */
    case 'N11': /* Felflares */
    case 'N24': /* Personal Servers */
    case 'N26': /* Snowmasons */
    case 'N37': /* Boomstick Officers */
    case 'N39': /* Hearthguards */
    case 'N41': /* Lich Summoners */
    case 'N57': /* Crazy Bombers */
    case 'N70': /* Aged Duskbringers */
    case 'N73': /* Trekking Aldermen */
    case 'S4': /* Dreadful Keepers */
    case 'S5': /* Faun Companions */
    case 'S8': /* Shady Ghoul */
    case 'S11': /* Devastators */
    case 'F9': /* Wandering Wyrms */
    case 'F12': /* Tode the Elevated */
    case 'I6': /* Finite Loopers */
    case 'I8': /* Linked Golems */
    case 'I12': /* Chaotic Pupil */
    case 'I13': /* Ember of Chaos */
    case 'I28': /* Booming Professors */
    case 'W18': /* Fleshmenders */
    case 'W7': /* Mystwives */
    case 'N64': /* Melodious Sisters */
    case 'W22': /* Chillbeards */
    case 'W27': /* Earthfathers */
    case 'W23': /* Olf the Hammer */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability)) / mana) * speed,
      ]
    }
    case 'W13': /* Rockworkers */ {
      return [
        (strength / mana) * getSpeedFactor(0),
        ((strength + parseAbility(ability)) / mana) * getSpeedFactor(1),
      ]
    }
    case 'S16': /* Dreadfauns */ {
      const [spawns, value] = ability.match(/(\d+)/g).map(Number)
      return [
        (strength / mana) * getSpeedFactor(0),
        ((strength + spawns * value) / mana) * getSpeedFactor(1),
      ]
    }
    case 'N8': /* Collector Mirz */ {
      const value = parseAbility(ability, 1)
      return [
        ((strength + value) / mana) * speed,
        ((strength + value) / mana) * speed,
      ]
    }
    case 'N9': /* Confinement */ {
      return [1 / mana, (MAX_STRENGTH - parseAbility(ability)) / mana]
    }
    case 'N58': /* Siren of the Seas */ {
      return [
        (strength / mana) * speed,
        ((strength + (MAX_STRENGTH - 3) * 3) / mana) * speed,
      ]
    }
    case 'N61': /* Hair-Raising Cats */ {
      return [
        (strength / mana) * speed,
        ((strength + MAX_STRENGTH * 2) / mana) * speed,
      ]
    }
    case 'F19': /* Sunbeam Serpents */ {
      return [
        (strength / mana) * speed,
        ((strength + MAX_STRENGTH) / mana) * speed,
      ]
    }
    case 'N65': /* Razor-Sharp Lynxes */ {
      const [strengthBuff, speedBuff] = ability.match(/(\d+)/g).map(Number)
      const buffedStrength = (strength + (strength + strengthBuff)) / 2
      const buffedSpeed = (speed + getSpeedFactor(movement + speedBuff)) / 2
      return [(strength / mana) * speed, (buffedStrength / mana) * buffedSpeed]
    }
    case 'I9': /* Sound Drivers */
    case 'N66': /* Bigthrust Tigers */ {
      return [
        (strength / mana) * getSpeedFactor(0),
        (strength / mana) * getSpeedFactor(4),
      ]
    }
    case 'N67': /* Wild Saberpaws */ {
      return [
        (strength / mana) * getSpeedFactor(0),
        (strength / mana) * getSpeedFactor(2),
      ]
    }
    case 'N68': /* Twilight Prowlers */ {
      return [
        (strength / mana) * getSpeedFactor(0),
        (strength / mana) * getSpeedFactor(3),
      ]
    }
    case 'N23': /* Hunter’s Vengeance */ {
      const strength = parseAbility(ability)
      return [
        (strength * -1 * UNIT_TYPES.length) / mana,
        (strength * UNIT_TYPES.length) / mana,
      ]
    }
    case 'N35': /* Ubass the Hunter */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability) * 10) / mana) * speed,
      ]
    }
    case 'N45': /* Powder Tower */ {
      return [
        strength / mana,
        (strength + parseAbility(ability) * MAX_TILES) / mana,
      ]
    }
    case 'N46': /* Tegor the Vengeful */ {
      const [a, b, c] = ability.match(/(\d+)/g).map(Number)

      return [
        ((strength + (a + b + c) / 3) / mana) * speed,
        ((strength + (a + b + c) / 3) / mana) * speed,
      ]
    }
    case 'W1' /* Icicle Burst */:
    case 'N21': /* Execution */ {
      return [1 / mana, parseAbility(ability) / mana]
    }
    case 'N15': /* Potion of Growth */
    case 'W14': /* Blessed with Brawn */
    case 'W6': /* Moment’s Peace */ {
      const value = parseAbility(ability)
      return [value / mana, value / mana]
    }
    case 'S18': /* Pillar of Dooms */
    case 'I14': /* Mech Workshop */
    case 'W3': /* The Hearth */
    case 'N34': /* Trueshot Post */ {
      return [strength / mana, (strength + parseAbility(ability)) / mana]
    }
    case 'N17': /* Wetland Deceivers */ {
      const value = parseAbility(ability)
      return [
        ((strength - value * 8) / mana) * speed,
        ((strength + value * 8) / mana) * speed,
      ]
    }
    case 'N50': /* Call for Aid */ {
      const value = parseAbility(ability)
      return [value / mana, (value * 4) / mana]
    }
    case 'N63': /* Unhealthy Hysteria */ {
      const value = parseAbility(ability)
      return [2 / mana, (value * 2) / mana]
    }
    case 'N56': /* Temple Guardians */
    case 'N42': /* Lucky Charmers */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability) * 3) / mana) * speed,
      ]
    }
    case 'I23': /* Armed Schemers */
    case 'S9': /* Swarmcallers */
    case 'F5': /* Crimson Sentry */
    case 'N10': /* Conflicted Drakes */
    case 'N49': /* Avian Stalkers */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability) * 4) / mana) * speed,
      ]
    }
    case 'N20': /* Emerald Towers */ {
      return [strength / mana, (strength + parseAbility(ability) * 4) / mana]
    }
    case 'N31': /* Flooding the Gates */ {
      const value = parseAbility(ability)
      return [(value * -4) / mana, (value * 4) / mana]
    }
    case 'N59': /* Edrik the Fierce */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability) * 5) / mana) * speed,
      ]
    }
    case 'N69': /* Laurus, King in Exile */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability) * 6) / mana) * speed,
      ]
    }
    case 'N43': /* Ludic Matriarchs */ {
      return [
        (strength / mana) * getSpeedFactor(0),
        ((strength + parseAbility(ability) * 6) / mana) * getSpeedFactor(1),
      ]
    }
    case 'F14': /* Witches of the Wild */
    case 'F20': /* Blood Ministers */
    case 'S14': /* Pan Heralds */
    case 'N25': /* Siegebreakers */
    case 'N47': /* Victors of the Melee */
    case 'W4': /* Wisp Cloud */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability) * 8) / mana) * speed,
      ]
    }
    case 'I10': /* Upgrade Point */ {
      return [strength / mana, (strength + parseAbility(ability) * 8) / mana]
    }
    case 'I3': /* Fortification Tonic */ {
      const value = parseAbility(ability)
      return [(value * 1) / mana, (value * 8) / mana]
    }
    case 'I11': /* Boosting Elixir */ {
      const value = parseAbility(ability)
      return [(value * 1) / mana, (value * 2) / mana]
    }
    case 'F8': /* Rain of Frogs */ {
      const [value, toadMin, toadMax = toadMin] = ability
        .match(/(\d)/g)
        .map(Number)
      return [(toadMin * value) / mana, (toadMax * value) / mana]
    }
    case 'F1': /* Brood Sages */ {
      return [
        (strength / mana) * getSpeedFactor(0),
        ((strength + 1 * 10) / mana) * getSpeedFactor(1),
      ]
    }
    case 'F4': /* Toxic Sacrifice */ {
      return [(1 - MAX_STRENGTH) / mana, (parseAbility(ability) * 8 - 1) / mana]
    }
    case 'F10': /* Azure Hatchers */ {
      const [value, toads] = ability.match(/(\d)/g).map(Number)
      return [
        (strength / mana) * speed,
        ((strength + toads * value) / mana) * speed,
      ]
    }
    case 'F11': /* Marked as Prey */ {
      const [damage, strength] = ability.match(/(\d+)/g).map(Number)
      return [Math.max(damage - strength, 1) / mana, (damage + strength) / mana]
    }
    case 'S13': /* Mischiefs */
    case 'I15': /* Overchargers */ {
      const value = parseAbility(ability)
      return [
        ((strength + value) / mana) * speed,
        ((strength + value) / mana) * speed,
      ]
    }
    case 'N29': /* Bladestorm */ {
      const [min, max = min] = ability
        .match(/\d(?:-\d)?/g)[0]
        .split('-')
        .map(Number)
      const value = (min + max) / 2
      return [(value * 1) / mana, (value * 20) / mana]
    }
    case 'N36': /* Voidsurgers */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability, 1) * 8) / mana) * speed,
      ]
    }
    case 'N44': /* Needle Blast */ {
      const [value, times] = ability.match(/(\d)/g).map(Number)
      return [value / mana, (times * value) / mana]
    }
    case 'I17': /* Eloth the Ignited */ {
      return [
        (strength / mana) * getSpeedFactor(0),
        ((strength + parseAbility(ability)) / mana) * getSpeedFactor(4),
      ]
    }
    case 'I19': /* Siege Assembly */ {
      const value = parseAbility(ability)
      return [(strength + value) / mana, (strength + value) / mana]
    }
    case 'I18': /* Flaming Stream */ {
      const value = parseAbility(ability)
      return [value / mana, (value * 5) / mana]
    }
    case 'F24': /* Clerics with Cords */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability) * 2) / mana) * getSpeedFactor(1),
      ]
    }
    case 'I16': /* Debug Loggers */
    case 'F16': /* Feral Shamans */
    case 'F15': /* Amberhides */
    case 'I20': /* Windmakers */
    case 'I7': /* Greengale Serpents */
    case 'S12': /* Draconic Roamers */
    case 'N27': /* Terrific Slayers */
    case 'N55': /* Joust Champions */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability) * 2) / mana) * speed,
      ]
    }
    case 'W28': /* Chilled Stonedames */ {
      return [
        (strength / mana) * speed,
        ((strength + (strength - 2) * 4) / mana) * speed,
      ]
    }
    case 'W10': /* Lady Rime */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability) * (MAX_MANA - mana)) / MAX_MANA) *
          speed,
      ]
    }
    case 'W12': /* Rimelings */ {
      const value = parseAbility(ability)
      return [
        (strength / (mana - value)) * speed,
        (strength / (mana - value)) * speed,
      ]
    }
    case 'W15': /* Broken Earth Drakes */ {
      const value = parseAbility(ability)
      return [
        ((strength - value * 18) / mana) * speed,
        ((strength + value * 18) / mana) * speed,
      ]
    }
    case 'W19': /* Gift of the Wise */ {
      const value = parseAbility(ability)
      return [Math.abs(mana - value), Math.abs(mana - value)]
    }
    case 'W21': /* Visions of the Grove */ {
      const value = parseAbility(ability)
      const remainingMana = MAX_MANA - mana
      const rows = 5
      return [
        (strength / mana) * speed,
        ((strength + (remainingMana / value) * rows) / mana) * speed,
      ]
    }
    case 'F3': /* Dubious Hags */
    case 'I1': /* Destructobots */ {
      return [
        ((strength - parseAbility(ability)) / mana) * speed,
        (strength / mana) * speed,
      ]
    }
    case 'F21': /* Broodmother Qordia */ {
      const [eggs, value] = ability.match(/(\d)/g)
      return [
        (strength / mana) * speed,
        ((strength + eggs * value) / mana) * speed,
      ]
    }
    case 'F22': /* Curse of Strings */ {
      return [(1 * 2) / mana, (parseAbility(ability) * 2) / mana]
    }
    case 'F23': /* High-Priestess Klaxi */ {
      return [
        (strength / mana) * speed,
        ((strength + MAX_TILES * parseAbility(ability) * getSpeedFactor(4)) /
          mana) *
          getSpeedFactor(4),
      ]
    }
    case 'F28': /* Hairy Chestnuts */ {
      return [
        (strength / mana) * speed,
        ((strength + 2 * parseAbility(ability)) / mana) * speed,
      ]
    }
    case 'S28': /* Bucks of Wasteland */ {
      return [
        (strength / mana) * speed,
        ((strength + (strength - 1) * parseAbility(ability)) / mana) * speed,
      ]
    }
    case 'S23': /* Lasting Remains */ {
      return [(strength / mana) * speed, (strength / mana) * getSpeedFactor(4)]
    }
    case 'N74': /* Beards of Crowglyph */
    case 'F18': /* Soulcrushers */ {
      return [(strength / mana) * speed, ((strength * 2 - 1) / mana) * speed]
    }
    case 'S2': /* Restless Goats */ {
      return [
        ((strength - parseAbility(ability)) / mana) * speed,
        ((strength - parseAbility(ability)) / mana) * speed,
      ]
    }
    case 'S1': /* Doppelbocks */ {
      return [
        (strength / mana) * getSpeedFactor(0),
        ((strength + parseAbility(ability)) / mana) * speed,
      ]
    }
    case 'S7': /* Moonlit Aerie */ {
      return [
        strength / mana,
        (strength + parseAbility(ability) * MAX_TILES) / mana,
      ]
    }
    case 'S10': /* Broken Truce */ {
      const [damage, penalty] = ability.match(/(\d+)/g).map(Number)
      return [(1 - penalty) / mana, (damage - penalty) / mana]
    }
    case 'S19': /* Xuri, Lord of Life */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability) * 3) / mana) * getSpeedFactor(4),
      ]
    }
    case 'S21': /* Queen of Herds */ {
      const PanHeralds = getResolvedCardData(cardsIndex, { id: 'S14', level })
      const buff = parseAbility(PanHeralds.ability)
      const Dreadfauns = getResolvedCardData(cardsIndex, { id: 'S16', level })
      const [spawns, value] = Dreadfauns.ability.match(/(\d+)/g).map(Number)
      const limit = parseAbility(ability)
      const PanHeraldsValue = PanHeralds.strength + 8 * buff
      const DreadfaunsValue = Dreadfauns.strength + spawns * value
      const adds = PanHeraldsValue + (limit > 1 ? DreadfaunsValue : 0)

      return [(strength / mana) * speed, ((strength + adds) / mana) * speed]
    }
    case 'S22': /* Vindicators */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability) * speed) / mana) * speed,
      ]
    }
    case 'S24': /* Head Start */ {
      const value = parseAbility(ability)
      return [(value / mana) * speed, (value / mana) * speed]
    }
    case 'W17': /* Wolfcloaks */ {
      return [(1 / mana) * speed, (strength / mana) * speed]
    }
    case 'N18': /* Beasts of Terror */
    case 'N53': /* Sharpfist Exiles */
    case 'N51': /* Dangerous Suitors */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability) * MAX_TILES) / mana) * speed,
      ]
    }
    case 'N40': /* Kindred’s Grace */ {
      const [primary, secondary] = ability.match(/(\d+)/g).map(Number)
      return [primary / mana, (primary + secondary * MAX_TILES) / mana]
    }
    case 'S15': /* Dark Harvest */ {
      const value = parseAbility(ability)
      return [value / mana, (value * MAX_TILES) / mana]
    }
    case 'N75': /* Greenwood Ancients */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability) * MAX_TILES) / mana) * speed,
      ]
    }
    case 'N76': /* Prime Oracle Bragda */ {
      return [
        (strength / mana) * speed,
        ((strength + (strength - 1) * MAX_TILES) / mana) * speed,
      ]
    }
    case 'F27': /* Faithless Prophets */ {
      return [
        ((1 - (strength - 1) * 2) / mana) * speed,
        (strength / mana) * speed,
      ]
    }
    case 'I22': /* Project PH03-NIX */ {
      return [
        (strength / mana) * speed,
        ((strength + parseAbility(ability)) / mana) * speed,
      ]
    }
    case 'I24': /* Mechanical Workers */ {
      const [health, spawn] = ability.match(/(\d)/g).map(Number)
      return [
        (strength / mana) * speed,
        ((strength + health + spawn) / mana) * speed,
      ]
    }
    case 'I27': /* Scrapped Planners */ {
      return [
        (strength / mana) * speed,
        ((strength - 1 + parseAbility(ability)) / mana) * speed,
      ]
    }
    case 'F17': /* Obsidian Butchers */ {
      return [
        (strength / mana) * speed,
        ((strength + 2 * MAX_TILES) / mana) * speed,
      ]
    }

    default: {
      if (type === 'unit') {
        return [(strength / mana) * speed, (strength / mana) * speed]
      }
      if (type === 'structure') {
        return [strength / mana, strength / mana]
      }
      return null
    }
  }
}

export default getCardValue
