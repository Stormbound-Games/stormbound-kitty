import { RACES } from '~/constants/game'
import getCardValue, { MAX_TILES, MAX_MANA } from './'

describe('The `getCardValue` helper', () => {
  it('should return value for Green Prototypes', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N1', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N1', 5)
    expect(value1[0]).toEqual(0)
    expect(value1[1]).toEqual((1 / 1) * 1)
    expect(value5[0]).toEqual(0)
    expect(value5[1]).toEqual((5 / 1) * 1)
  })

  it('should return value for Summon Militia', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N2', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N2', 5)
    expect(value1[0]).toEqual((1 / 1) * 0.5)
    expect(value1[1]).toEqual((1 / 1) * 0.5)
    expect(value5[0]).toEqual((5 / 1) * 0.5)
    expect(value5[1]).toEqual((5 / 1) * 0.5)
  })

  it('should return value for Gifted Recruits', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N3', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N3', 5)
    expect(value1[0]).toEqual((1 / 2) * 1)
    expect(value1[1]).toEqual((1 / 2) * 1)
    expect(value5[0]).toEqual((5 / 2) * 1)
    expect(value5[1]).toEqual((5 / 2) * 1)
  })

  it('should return value for Lawless Herd', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N4', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N4', 5)
    expect(value1[0]).toEqual((2 / 2) * 0.5)
    expect(value1[1]).toEqual((2 / 2) * 0.5)
    expect(value5[0]).toEqual((6 / 2) * 0.5)
    expect(value5[1]).toEqual((6 / 2) * 0.5)
  })

  it('should return value for Northsea Dog', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N5', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N5', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual(((1 + 5) / 2) * 0.5)
    expect(value5[0]).toEqual((1 / 2) * 0.5)
    expect(value5[1]).toEqual(((1 + 10) / 2) * 0.5)
  })

  it('should return value for Spare Dragonling', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N6', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N6', 5)
    expect(value1[0]).toEqual((1 / 2) * 1)
    expect(value1[1]).toEqual(((1 + 3) / 2) * 1)
    expect(value5[0]).toEqual((1 / 2) * 1)
    expect(value5[1]).toEqual(((1 + 7) / 2) * 1)
  })

  it('should return value for Brothers in Arms', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N7', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N7', 5)
    expect(value1[0]).toEqual((3 / 3) * 0.5)
    expect(value1[1]).toEqual(((3 + 1) / 3) * 0.5)
    expect(value5[0]).toEqual((6 / 3) * 0.5)
    expect(value5[1]).toEqual(((6 + 3) / 3) * 0.5)
  })

  it('should return value for Collector Mirz', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N8', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N8', 5)
    expect(value1[0]).toEqual(((1 + 5) / 3) * 0.5)
    expect(value1[1]).toEqual(((1 + 5) / 3) * 0.5)
    expect(value5[0]).toEqual(((3 + 10) / 3) * 0.5)
    expect(value5[1]).toEqual(((3 + 10) / 3) * 0.5)
  })

  it('should return value for Confinement', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N9', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N9', 5)
    expect(value1[0]).toEqual(1 / 3)
    expect(value1[1]).toEqual((10 - 5) / 3)
    expect(value5[0]).toEqual(1 / 3)
    expect(value5[1]).toEqual((24 - 1) / 3)
  })

  it('should return value for Conflicted Drakes', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N10', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N10', 5)
    expect(value1[0]).toEqual((2 / 3) * 0.5)
    expect(value1[1]).toEqual(((2 + 2 * 4) / 3) * 0.5)
    expect(value5[0]).toEqual((4 / 3) * 0.5)
    expect(value5[1]).toEqual(((4 + 4 * 4) / 3) * 0.5)
  })

  it('should return value for Felflares', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N11', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N11', 5)
    expect(value1[0]).toEqual((2 / 3) * 0.5)
    expect(value1[1]).toEqual(((2 + 2) / 3) * 0.5)
    expect(value5[0]).toEqual((2 / 3) * 0.5)
    expect(value5[1]).toEqual(((2 + 6) / 3) * 0.5)
  })

  it('should return value for First Mutineer', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N12', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N12', 5)
    expect(value1[0]).toEqual((1 / 3) * 1.5)
    expect(value1[1]).toEqual((1 / 3) * 1.5)
    expect(value5[0]).toEqual((5 / 3) * 1.5)
    expect(value5[1]).toEqual((5 / 3) * 1.5)
  })

  it('should return value for Fort of Ebonrock', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N13', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N13', 5)
    expect(value1[0]).toEqual(4 / 3)
    expect(value1[1]).toEqual(4 / 3)
    expect(value5[0]).toEqual(8 / 3)
    expect(value5[1]).toEqual(8 / 3)
  })

  it('should return value for Freebooters', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N14', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N14', 5)
    expect(value1[0]).toEqual((2 / 3) * 0.5)
    expect(value1[1]).toEqual((2 / 3) * 0.5)
    expect(value5[0]).toEqual((5 / 3) * 0.5)
    expect(value5[1]).toEqual((5 / 3) * 0.5)
  })

  it('should return value for Potion of Growth', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N15', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N15', 5)
    expect(value1[0]).toEqual(2 / 3)
    expect(value1[1]).toEqual(2 / 3)
    expect(value5[0]).toEqual(6 / 3)
    expect(value5[1]).toEqual(6 / 3)
  })

  it('should return value for Westwind Sailors', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N16', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N16', 5)
    expect(value1[0]).toEqual((2 / 3) * 1)
    expect(value1[1]).toEqual((2 / 3) * 1)
    expect(value5[0]).toEqual((6 / 3) * 1)
    expect(value5[1]).toEqual((6 / 3) * 1)
  })

  it('should return value for Wetland Deceivers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N17', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N17', 5)
    expect(value1[0]).toEqual(((3 - 8 * 1) / 3) * 0.5)
    expect(value1[1]).toEqual(((3 + 8 * 1) / 3) * 0.5)
    expect(value5[0]).toEqual(((7 - 8 * 3) / 3) * 0.5)
    expect(value5[1]).toEqual(((7 + 8 * 3) / 3) * 0.5)
  })

  it('should return value for Beasts of Terror', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N18', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N18', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + 2 * MAX_TILES) / 4) * 1)
    expect(value5[0]).toEqual((6 / 4) * 1)
    expect(value5[1]).toEqual(((6 + 4 * MAX_TILES) / 4) * 1)
  })

  it('should return value for Cabin Girls', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N19', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N19', 5)
    expect(value1[0]).toEqual((5 / 4) * 0.5)
    expect(value1[1]).toEqual((5 / 4) * 0.5)
    expect(value5[0]).toEqual((10 / 4) * 0.5)
    expect(value5[1]).toEqual((10 / 4) * 0.5)
  })

  it('should return value for Emerald Towers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N20', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N20', 5)
    expect(value1[0]).toEqual(4 / 4)
    expect(value1[1]).toEqual((4 + 2 * 4) / 4)
    expect(value5[0]).toEqual(8 / 4)
    expect(value5[1]).toEqual((8 + 4 * 4) / 4)
  })

  it('should return value for Execution', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N21', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N21', 5)
    expect(value1[0]).toEqual(1 / 4)
    expect(value1[1]).toEqual(4 / 4)
    expect(value5[0]).toEqual(1 / 4)
    expect(value5[1]).toEqual(8 / 4)
  })

  it('should return value for Goldgrubbers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N22', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N22', 5)
    expect(value1[0]).toEqual((4 / 4) * 1)
    expect(value1[1]).toEqual((4 / 4) * 1)
    expect(value5[0]).toEqual((8 / 4) * 1)
    expect(value5[1]).toEqual((8 / 4) * 1)
  })

  it('should return value for Hunter’s Vengeance', () => {
    const types = RACES.length + 3
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N23', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N23', 5)
    expect(value1[0]).toEqual((-2 * types) / 3)
    expect(value1[1]).toEqual((2 * types) / 3)
    expect(value5[0]).toEqual((-6 * types) / 3)
    expect(value5[1]).toEqual((6 * types) / 3)
  })

  it('should return value for Personal Servers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N24', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N24', 5)
    expect(value1[0]).toEqual((1 / 3) * 1)
    expect(value1[1]).toEqual(((1 + 2) / 3) * 1)
    expect(value5[0]).toEqual((3 / 3) * 1)
    expect(value5[1]).toEqual(((3 + 4) / 3) * 1)
  })

  it('should return value for Siegebreakers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N25', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N25', 5)
    expect(value1[0]).toEqual((4 / 4) * 1)
    expect(value1[1]).toEqual(((4 + 4 * 8) / 4) * 1)
    expect(value5[0]).toEqual((8 / 4) * 1)
    expect(value5[1]).toEqual(((8 + 8 * 8) / 4) * 1)
  })

  it('should return value for Snowmasons', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N26', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N26', 5)
    expect(value1[0]).toEqual((2 / 4) * 1)
    expect(value1[1]).toEqual(((2 + 4) / 4) * 1)
    expect(value5[0]).toEqual((2 / 4) * 1)
    expect(value5[1]).toEqual(((2 + 8) / 4) * 1)
  })

  it('should return value for Terrific Slayers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N27', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N27', 5)
    expect(value1[0]).toEqual((2 / 4) * 1.5)
    expect(value1[1]).toEqual(((2 + 5 * 2) / 4) * 1.5)
    expect(value5[0]).toEqual((6 / 4) * 1.5)
    expect(value5[1]).toEqual(((6 + 10 * 2) / 4) * 1.5)
  })

  it('should return value for Warfront Runners', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N28', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N28', 5)
    expect(value1[0]).toEqual((2 / 4) * 1.5)
    expect(value1[1]).toEqual((2 / 4) * 1.5)
    expect(value5[0]).toEqual((6 / 4) * 1.5)
    expect(value5[1]).toEqual((6 / 4) * 1.5)
  })

  it('should return value for Bladestorm', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N29', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N29', 5)
    expect(value1[0]).toEqual(1 / 5)
    expect(value1[1]).toEqual((1 * 20) / 5)
    expect(value5[0]).toEqual(4 / 5)
    expect(value5[1]).toEqual((4 * 20) / 5)
  })

  it('should return value for Bluesail Raiders', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N30', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N30', 5)
    expect(value1[0]).toEqual((3 / 5) * 1.5)
    expect(value1[1]).toEqual((3 / 5) * 1.5)
    expect(value5[0]).toEqual((7 / 5) * 1.5)
    expect(value5[1]).toEqual((7 / 5) * 1.5)
  })

  it('should return value for Flooding the Gates', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N31', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N31', 5)
    expect(value1[0]).toEqual((5 * 4) / -4)
    expect(value1[1]).toEqual((5 * 4) / 4)
    expect(value5[0]).toEqual((10 * 4) / -4)
    expect(value5[1]).toEqual((10 * 4) / 4)
  })

  it('should return value for Heroic Soldiers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N32', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N32', 5)
    expect(value1[0]).toEqual((5 / 5) * 1)
    expect(value1[1]).toEqual((5 / 5) * 1)
    expect(value5[0]).toEqual((10 / 5) * 1)
    expect(value5[1]).toEqual((10 / 5) * 1)
  })

  it('should return value for Snake Eyes', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N33', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N33', 5)
    expect(value1[0]).toEqual((6 / 5) * 0.5)
    expect(value1[1]).toEqual((6 / 5) * 0.5)
    expect(value5[0]).toEqual((12 / 5) * 0.5)
    expect(value5[1]).toEqual((12 / 5) * 0.5)
  })

  it('should return value for Trueshot Post', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N34', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N34', 5)
    expect(value1[0]).toEqual(4 / 5)
    expect(value1[1]).toEqual((4 + 4) / 5)
    expect(value5[0]).toEqual(8 / 5)
    expect(value5[1]).toEqual((8 + 8) / 5)
  })

  it('should return value for Ubass the Hunter', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N35', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N35', 5)
    expect(value1[0]).toEqual((5 / 5) * 0.5)
    expect(value1[1]).toEqual(((5 + 10 * 1) / 5) * 0.5)
    expect(value5[0]).toEqual((10 / 5) * 0.5)
    expect(value5[1]).toEqual(((10 + 10 * 3) / 5) * 0.5)
  })

  it('should return value for Voidsurgers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N36', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N36', 5)
    expect(value1[0]).toEqual((6 / 5) * 0.5)
    expect(value1[1]).toEqual(((6 + 2 * 8) / 5) * 0.5)
    expect(value5[0]).toEqual((6 / 5) * 0.5)
    expect(value5[1]).toEqual(((6 + 6 * 8) / 5) * 0.5)
  })

  it('should return value for Boomstick Officers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N37', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N37', 5)
    expect(value1[0]).toEqual((5 / 6) * 1)
    expect(value1[1]).toEqual(((5 + 4) / 6) * 1)
    expect(value5[0]).toEqual((10 / 6) * 1)
    expect(value5[1]).toEqual(((10 + 8) / 6) * 1)
  })

  it.skip('should return value for Harvesters of Souls', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N38', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N38', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Hearthguards', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N39', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N39', 5)
    expect(value1[0]).toEqual((3 / 6) * 1.5)
    expect(value1[1]).toEqual(((3 + 3) / 6) * 1.5)
    expect(value5[0]).toEqual((7 / 6) * 1.5)
    expect(value5[1]).toEqual(((7 + 7) / 6) * 1.5)
  })

  it('should return value for Kindred’s Grace', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N40', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N40', 5)
    expect(value1[0]).toEqual(7 / 6)
    expect(value1[1]).toEqual((7 + 2 * MAX_TILES) / 6)
    expect(value5[0]).toEqual(12 / 6)
    expect(value5[1]).toEqual((12 + 5 * MAX_TILES) / 6)
  })

  it('should return value for Lich Summoners', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N41', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N41', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + 3) / 4) * 1)
    expect(value5[0]).toEqual((6 / 4) * 1)
    expect(value5[1]).toEqual(((6 + 7) / 4) * 1)
  })

  it('should return value for Lucky Charmers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N42', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N42', 5)
    expect(value1[0]).toEqual((4 / 6) * 1)
    expect(value1[1]).toEqual(((4 + 3 * 3) / 6) * 1)
    expect(value5[0]).toEqual((7 / 6) * 1)
    expect(value5[1]).toEqual(((7 + 6 * 3) / 6) * 1)
  })

  it('should return value for Ludic Matriarchs', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N43', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N43', 5)
    expect(value1[0]).toEqual((5 / 6) * 0.5)
    expect(value1[1]).toEqual(((5 + 1 * 6) / 6) * 1)
    expect(value5[0]).toEqual((10 / 6) * 0.5)
    expect(value5[1]).toEqual(((10 + 3 * 6) / 6) * 1)
  })

  it('should return value for Needle Blast', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N44', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N44', 5)
    expect(value1[0]).toEqual((2 * 1) / 6)
    expect(value1[1]).toEqual((2 * 2) / 6)
    expect(value5[0]).toEqual((4 * 1) / 6)
    expect(value5[1]).toEqual((4 * 4) / 6)
  })

  it('should return value for Powder Tower', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N45', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N45', 5)
    expect(value1[0]).toEqual(3 / 6)
    expect(value1[1]).toEqual((3 + MAX_TILES * 2) / 6)
    expect(value5[0]).toEqual(6 / 6)
    expect(value5[1]).toEqual((6 + MAX_TILES * 4) / 6)
  })

  it('should return value for Tegor the Vengeful', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N46', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N46', 5)
    const effect1 = (6 + 5 + 4) / 3
    const effect5 = (12 + 10 + 8) / 3
    expect(value1[0]).toEqual(((4 + effect1) / 6) * 1.5)
    expect(value1[1]).toEqual(((4 + effect1) / 6) * 1.5)
    expect(value5[0]).toEqual(((8 + effect5) / 6) * 1.5)
    expect(value5[1]).toEqual(((8 + effect5) / 6) * 1.5)
  })

  it('should return value for Victors of the Melee', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N47', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N47', 5)
    expect(value1[0]).toEqual((4 / 6) * 1)
    expect(value1[1]).toEqual(((4 + 2 * 8) / 6) * 1)
    expect(value5[0]).toEqual((8 / 6) * 1)
    expect(value5[1]).toEqual(((8 + 4 * 8) / 6) * 1)
  })

  it.skip('should return value for Archdruid Earyn', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N48', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N48', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Avian Stalkers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N49', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N49', 5)
    expect(value1[0]).toEqual((5 / 6) * 0.5)
    expect(value1[1]).toEqual(((5 + 4 * 3) / 6) * 0.5)
    expect(value5[0]).toEqual((10 / 6) * 0.5)
    expect(value5[1]).toEqual(((10 + 4 * 7) / 6) * 0.5)
  })

  it('should return value for Call for Aid', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N50', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N50', 5)
    expect(value1[0]).toEqual(3 / 7)
    expect(value1[1]).toEqual((3 * 4) / 7)
    expect(value5[0]).toEqual(7 / 7)
    expect(value5[1]).toEqual((7 * 4) / 7)
  })

  it('should return value for Dangerous Suitors', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N51', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N51', 5)
    expect(value1[0]).toEqual((5 / 6) * 1)
    expect(value1[1]).toEqual(((5 + MAX_TILES * 2) / 6) * 1)
    expect(value5[0]).toEqual((10 / 6) * 1)
    expect(value5[1]).toEqual(((10 + MAX_TILES * 4) / 6) * 1)
  })

  it('should return value for Salty Outcasts', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N52', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N52', 5)
    expect(value1[0]).toEqual((5 / 7) * 1.5)
    expect(value1[1]).toEqual((5 / 7) * 1.5)
    expect(value5[0]).toEqual((10 / 7) * 1.5)
    expect(value5[1]).toEqual((10 / 7) * 1.5)
  })

  it('should return value for Sharpfist Exiles', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N53', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N53', 5)
    expect(value1[0]).toEqual((2 / 7) * 1)
    expect(value1[1]).toEqual(((2 + MAX_TILES * 2) / 7) * 1)
    expect(value5[0]).toEqual((7 / 7) * 1)
    expect(value5[1]).toEqual(((7 + MAX_TILES * 4) / 7) * 1)
  })

  it('should return value for Veterans of War', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N54', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N54', 5)
    expect(value1[0]).toEqual((8 / 7) * 1)
    expect(value1[1]).toEqual((8 / 7) * 1)
    expect(value5[0]).toEqual((18 / 7) * 1)
    expect(value5[1]).toEqual((18 / 7) * 1)
  })

  it('should return value for Joust Champions', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N55', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N55', 5)
    expect(value1[0]).toEqual((3 / 7) * 1.5)
    expect(value1[1]).toEqual(((3 + 3 * 2) / 7) * 1.5)
    expect(value5[0]).toEqual((7 / 7) * 1.5)
    expect(value5[1]).toEqual(((7 + 7 * 2) / 7) * 1.5)
  })

  it('should return value for Temple Guardians', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N56', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N56', 5)
    expect(value1[0]).toEqual((6 / 8) * 0.5)
    expect(value1[1]).toEqual(((6 + 4 * 3) / 8) * 0.5)
    expect(value5[0]).toEqual((12 / 8) * 0.5)
    expect(value5[1]).toEqual(((12 + 8 * 3) / 8) * 0.5)
  })

  it('should return value for Crazy Bombers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N57', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N57', 5)
    expect(value1[0]).toEqual((6 / 8) * 1)
    expect(value1[1]).toEqual(((6 + 7) / 8) * 1)
    expect(value5[0]).toEqual((13 / 8) * 1)
    expect(value5[1]).toEqual(((13 + 15) / 8) * 1)
  })

  it('should return value for Siren of the Seas', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N58', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N58', 5)
    expect(value1[0]).toEqual((6 / 9) * 1.75)
    expect(value1[1]).toEqual(((6 + (10 - 3) * 3) / 9) * 1.75)
    expect(value5[0]).toEqual((12 / 9) * 1.75)
    expect(value5[1]).toEqual(((12 + (24 - 3) * 3) / 9) * 1.75)
  })

  it('should return value for Edrik the Fierce', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N59', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N59', 5)
    expect(value1[0]).toEqual((3 / 4) * 0.5)
    expect(value1[1]).toEqual(((3 + 2 * 5) / 4) * 0.5)
    expect(value5[0]).toEqual((7 / 4) * 0.5)
    expect(value5[1]).toEqual(((7 + 6 * 5) / 4) * 0.5)
  })

  it('should return value for Fluffy Badboxers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N60', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N60', 5)
    expect(value1[0]).toEqual((5 / 5) * 1)
    expect(value1[1]).toEqual((5 / 5) * 1)
    expect(value5[0]).toEqual((10 / 5) * 1)
    expect(value5[1]).toEqual((10 / 5) * 1)
  })

  it('should return value for Hair-Raising Cats', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N61', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N61', 5)
    expect(value1[0]).toEqual((3 / 3) * 0.5)
    expect(value1[1]).toEqual(((3 + 10 * 2) / 3) * 0.5)
    expect(value5[0]).toEqual((7 / 3) * 0.5)
    expect(value5[1]).toEqual(((7 + 24 * 2) / 3) * 0.5)
  })

  it('should return value for Sweetcap Kittens', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N62', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N62', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual((1 / 2) * 0.5)
    expect(value5[0]).toEqual((5 / 2) * 0.5)
    expect(value5[1]).toEqual((5 / 2) * 0.5)
  })

  it('should return value for Unhealthy Hysteria', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N63', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N63', 5)
    expect(value1[0]).toEqual(2 / 3)
    expect(value1[1]).toEqual((4 * 2) / 3)
    expect(value5[0]).toEqual(2 / 3)
    expect(value5[1]).toEqual((8 * 2) / 3)
  })

  it('should return value for Melodious Sisters', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N64', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N64', 5)
    expect(value1[0]).toEqual((4 / 4) * 1)
    expect(value1[1]).toEqual(((4 + 5) / 4) * 1)
    expect(value5[0]).toEqual((8 / 4) * 1)
    expect(value5[1]).toEqual(((8 + 9) / 4) * 1)
  })

  it('should return value for Razor-Sharp Lynxes', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N65', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N65', 5)
    expect(value1[0]).toEqual((2 / 4) * 1)
    expect(value1[1]).toEqual((3 / 4) * 1.25)
    expect(value5[0]).toEqual((6 / 4) * 1)
    expect(value5[1]).toEqual((7 / 4) * 1.25)
  })

  it('should return value for Bigthrust Tigers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N66', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N66', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual((1 / 2) * 2)
    expect(value5[0]).toEqual((5 / 2) * 0.5)
    expect(value5[1]).toEqual((5 / 2) * 2)
  })

  it('should return value for Wild Saberpaws', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N67', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N67', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual((1 / 2) * 1.5)
    expect(value5[0]).toEqual((5 / 2) * 0.5)
    expect(value5[1]).toEqual((5 / 2) * 1.5)
  })

  it('should return value for Twilight Prowlers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N68', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N68', 5)
    expect(value1[0]).toEqual((7 / 6) * 0.5)
    expect(value1[1]).toEqual((7 / 6) * 1.75)
    expect(value5[0]).toEqual((15 / 6) * 0.5)
    expect(value5[1]).toEqual((15 / 6) * 1.75)
  })

  it('should return value for Laurus, King in Exile', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N69', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N69', 5)
    expect(value1[0]).toEqual((5 / 5) * 1)
    expect(value1[1]).toEqual(((5 + 4 * 3 * 2) / 5) * 1)
    expect(value5[0]).toEqual((10 / 5) * 1)
    expect(value5[1]).toEqual(((10 + 8 * 3 * 2) / 5) * 1)
  })

  it('should return value for Aged Duskbringers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N70', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N70', 5)
    expect(value1[0]).toEqual((5 / 7) * 1)
    expect(value1[1]).toEqual(((5 + 4) / 7) * 1)
    expect(value5[0]).toEqual((10 / 7) * 1)
    expect(value5[1]).toEqual(((10 + 9) / 7) * 1)
  })

  it('should return value for Rapid Mousers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N71', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N71', 5)
    expect(value1[0]).toEqual((1 / 4) * 1.75)
    expect(value1[1]).toEqual((1 / 4) * 1.75)
    expect(value5[0]).toEqual((5 / 4) * 1.75)
    expect(value5[1]).toEqual((5 / 4) * 1.75)
  })

  it('should return value for Seasick Bouncers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N72', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N72', 5)
    expect(value1[0]).toEqual((8 / 6) * 0.5)
    expect(value1[1]).toEqual((8 / 6) * 0.5)
    expect(value5[0]).toEqual((18 / 6) * 0.5)
    expect(value5[1]).toEqual((18 / 6) * 0.5)
  })

  it('should return value for Trekking Aldermen', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N73', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N73', 5)
    expect(value1[0]).toEqual((3 / 3) * 0.5)
    expect(value1[1]).toEqual(((3 + 3) / 3) * 0.5)
    expect(value5[0]).toEqual((7 / 3) * 0.5)
    expect(value5[1]).toEqual(((7 + 5) / 3) * 0.5)
  })

  it('should return value for Beards of Crowglyph', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N74', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N74', 5)
    expect(value1[0]).toEqual((7 / 6) * 0.5)
    expect(value1[1]).toEqual(((7 + 7 - 1) / 6) * 0.5)
    expect(value5[0]).toEqual((13 / 6) * 0.5)
    expect(value5[1]).toEqual(((13 + 13 - 1) / 6) * 0.5)
  })

  it('should return value for Greenwood Ancients', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N75', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N75', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + MAX_TILES * 2) / 4) * 1)
    expect(value5[0]).toEqual((6 / 4) * 1)
    expect(value5[1]).toEqual(((6 + MAX_TILES * 4) / 4) * 1)
  })

  it('should return value for Prime Oracle Bragda', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N76', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N76', 5)
    expect(value1[0]).toEqual((5 / 6) * 1)
    expect(value1[1]).toEqual(((5 + MAX_TILES * 4) / 6) * 1)
    expect(value5[0]).toEqual((11 / 6) * 1)
    expect(value5[1]).toEqual(((11 + MAX_TILES * 10) / 6) * 1)
  })

  it.skip('should return value for Rogue Sheep', () => {})

  it('should return value for Slyboots', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N78', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N78', 5)
    expect(value1[0]).toEqual((4 / 4) * 1)
    expect(value1[1]).toEqual((4 / 4) * 1)
    expect(value5[0]).toEqual((8 / 4) * 1)
    expect(value5[1]).toEqual((8 / 4) * 1)
  })

  it('should return value for Excited Mouser', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N79', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N79', 5)
    expect(value1[0]).toEqual((6 / 5) * 0.5)
    expect(value1[1]).toEqual((6 / 5) * 0.5)
    expect(value5[0]).toEqual((12 / 5) * 0.5)
    expect(value5[1]).toEqual((12 / 5) * 0.5)
  })

  it('should return value for Flameless Lizards', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N82', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N82', 5)
    expect(value1[0]).toEqual((7 / 5) * 0.5)
    expect(value1[1]).toEqual((7 / 5) * 0.5)
    expect(value5[0]).toEqual((14 / 5) * 0.5)
    expect(value5[1]).toEqual((14 / 5) * 0.5)
  })

  it('should return value for Headless Hotheads', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N83', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N83', 5)
    expect(value1[0]).toEqual((3 / 5) * 1.5)
    expect(value1[1]).toEqual((3 / 5) * 1.5)
    expect(value5[0]).toEqual((7 / 5) * 1.5)
    expect(value5[1]).toEqual((7 / 5) * 1.5)
  })

  it('should return value for Eternal Ethereals', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'N84', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'N84', 5)
    expect(value1[0]).toEqual((5 / 8) * 1.75)
    expect(value1[1]).toEqual((5 / 8) * 1.75)
    expect(value5[0]).toEqual((11 / 8) * 1.75)
    expect(value5[1]).toEqual((11 / 8) * 1.75)
  })

  it('should return value for Destructobots', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I1', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I1', 5)
    expect(value1[0]).toEqual(((2 - 1) / 2) * 1)
    expect(value1[1]).toEqual((2 / 2) * 1)
    expect(value5[0]).toEqual(((6 - 1) / 2) * 1)
    expect(value5[1]).toEqual((6 / 2) * 1)
  })

  it.skip('should return value for Doctor Mia', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I2', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I2', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Fortification Tonic', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I3', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I3', 5)
    expect(value1[0]).toEqual((2 * 1) / 3)
    expect(value1[1]).toEqual((2 * 8) / 3)
    expect(value5[0]).toEqual((6 * 1) / 3)
    expect(value5[1]).toEqual((6 * 8) / 3)
  })

  it('should return value for Ozone Purifiers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I4', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I4', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual((1 / 2) * 0.5)
    expect(value5[0]).toEqual((5 / 2) * 0.5)
    expect(value5[1]).toEqual((5 / 2) * 0.5)
  })

  it('should return value for Unstable Build', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I5', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I5', 5)
    expect(value1[0]).toEqual(5 / 2)
    expect(value1[1]).toEqual(5 / 2)
    expect(value5[0]).toEqual(9 / 2)
    expect(value5[1]).toEqual(9 / 2)
  })

  it('should return value for Finite Loopers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I6', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I6', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + 1) / 4) * 1)
    expect(value5[0]).toEqual((6 / 4) * 1)
    expect(value5[1]).toEqual(((6 + 3) / 4) * 1)
  })

  it('should return value for Greengale Serpents', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I7', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I7', 5)
    expect(value1[0]).toEqual((1 / 3) * 1.5)
    expect(value1[1]).toEqual(((1 + 1 * 2) / 3) * 1.5)
    expect(value5[0]).toEqual((3 / 3) * 1.5)
    expect(value5[1]).toEqual(((3 + 3 * 2) / 3) * 1.5)
  })

  it('should return value for Linked Golems', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I8', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I8', 5)
    expect(value1[0]).toEqual((2 / 3) * 1)
    expect(value1[1]).toEqual(((2 + 1) / 3) * 1)
    expect(value5[0]).toEqual((3 / 3) * 1)
    expect(value5[1]).toEqual(((3 + 4) / 3) * 1)
  })

  it('should return value for Sound Drivers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I9', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I9', 5)
    expect(value1[0]).toEqual((3 / 3) * 0.5)
    expect(value1[1]).toEqual((3 / 3) * 2)
    expect(value5[0]).toEqual((7 / 3) * 0.5)
    expect(value5[1]).toEqual((7 / 3) * 2)
  })

  it('should return value for Upgrade Point', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I10', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I10', 5)
    expect(value1[0]).toEqual(4 / 3)
    expect(value1[1]).toEqual((4 + 2 * 8) / 3)
    expect(value5[0]).toEqual(8 / 3)
    expect(value5[1]).toEqual((8 + 5 * 8) / 3)
  })

  it('should return value for Boosting Elixir', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I11', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I11', 5)
    expect(value1[0]).toEqual(3 / 4)
    expect(value1[1]).toEqual((3 + 3) / 4)
    expect(value5[0]).toEqual(6 / 4)
    expect(value5[1]).toEqual((6 + 6) / 4)
  })

  it('should return value for Chaotic Pupil', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I12', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I12', 5)
    expect(value1[0]).toEqual((1 / 5) * 1.5)
    expect(value1[1]).toEqual(((1 + 3) / 5) * 1.5)
    expect(value5[0]).toEqual((1 / 5) * 1.5)
    expect(value5[1]).toEqual(((1 + 7) / 5) * 1.5)
  })

  it('should return value for Embers of Chaos', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I13', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I13', 5)
    expect(value1[0]).toEqual((1 / 4) * 1)
    expect(value1[1]).toEqual(((1 + 6) / 4) * 1)
    expect(value5[0]).toEqual((1 / 4) * 1)
    expect(value5[1]).toEqual(((1 + 12) / 4) * 1)
  })

  it('should return value for Mech Workshop', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I14', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I14', 5)
    expect(value1[0]).toEqual(3 / 4)
    expect(value1[1]).toEqual((3 + 2) / 4)
    expect(value5[0]).toEqual(6 / 4)
    expect(value5[1]).toEqual((6 + 6) / 4)
  })

  it('should return value for Overchargers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I15', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I15', 5)
    expect(value1[0]).toEqual(((2 + 1) / 4) * 1)
    expect(value1[1]).toEqual(((2 + 1) / 4) * 1)
    expect(value5[0]).toEqual(((5 + 3) / 4) * 1)
    expect(value5[1]).toEqual(((5 + 3) / 4) * 1)
  })

  it('should return value for Debug Loggers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I16', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I16', 5)
    expect(value1[0]).toEqual((4 / 5) * 1)
    expect(value1[1]).toEqual(((4 + 2 * 2) / 5) * 1)
    expect(value5[0]).toEqual((8 / 5) * 1)
    expect(value5[1]).toEqual(((8 + 5 * 2) / 5) * 1)
  })

  it('should return value for Eloth the Ignited', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I17', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I17', 5)
    expect(value1[0]).toEqual((5 / 5) * 0.5)
    expect(value1[1]).toEqual(((5 + 3) / 5) * 2)
    expect(value5[0]).toEqual((10 / 5) * 0.5)
    expect(value5[1]).toEqual(((10 + 7) / 5) * 2)
  })

  it('should return value for Flaming Stream', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I18', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I18', 5)
    expect(value1[0]).toEqual((4 * 1) / 5)
    expect(value1[1]).toEqual((4 * 5) / 5)
    expect(value5[0]).toEqual((8 * 1) / 5)
    expect(value5[1]).toEqual((8 * 5) / 5)
  })

  it('should return value for Siege Assembly', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I19', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I19', 5)
    expect(value1[0]).toEqual((3 + 3) / 5)
    expect(value1[1]).toEqual((3 + 3) / 5)
    expect(value5[0]).toEqual((6 + 6) / 5)
    expect(value5[1]).toEqual((6 + 6) / 5)
  })

  it('should return value for Windmakers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I20', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I20', 5)
    expect(value1[0]).toEqual((2 / 4) * 1.5)
    expect(value1[1]).toEqual(((2 + 3 * 2) / 4) * 1.5)
    expect(value5[0]).toEqual((2 / 4) * 1.5)
    expect(value5[1]).toEqual(((2 + 7 * 2) / 4) * 1.5)
  })

  it('should return value for Delegators', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I21', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I21', 5)
    expect(value1[0]).toEqual((7 / 6) * 1)
    expect(value1[1]).toEqual((7 / 6) * 1)
    expect(value5[0]).toEqual((15 / 6) * 1)
    expect(value5[1]).toEqual((15 / 6) * 1)
  })

  it('should return value for Project PH03-NIX', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I22', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I22', 5)
    expect(value1[0]).toEqual((4 / 5) * 1)
    expect(value1[1]).toEqual(((4 + 5) / 5) * 1)
    expect(value5[0]).toEqual((8 / 5) * 1)
    expect(value5[1]).toEqual(((8 + 10) / 5) * 1)
  })

  it('should return value for Armed Schemers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I23', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I23', 5)
    expect(value1[0]).toEqual((6 / 6) * 0.5)
    expect(value1[1]).toEqual(((6 + 3 * 4) / 6) * 0.5)
    expect(value5[0]).toEqual((12 / 6) * 0.5)
    expect(value5[1]).toEqual(((12 + 7 * 4) / 6) * 0.5)
  })

  it('should return value for Mechanical Workers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I24', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I24', 5)
    expect(value1[0]).toEqual((5 / 6) * 1)
    expect(value1[1]).toEqual(((5 + 3 + 2) / 6) * 1)
    expect(value5[0]).toEqual((9 / 6) * 1)
    expect(value5[1]).toEqual(((9 + 6 + 6) / 6) * 1)
  })

  it('should return value for Agents in Charge', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I25', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I25', 5)
    expect(value1[0]).toEqual((3 / 5) * 1.75)
    expect(value1[1]).toEqual((3 / 5) * 1.75)
    expect(value5[0]).toEqual((7 / 5) * 1.75)
    expect(value5[1]).toEqual((7 / 5) * 1.75)
  })

  it('should return value for Operators', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I26', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I26', 5)
    expect(value1[0]).toEqual((10 / 8) * 1)
    expect(value1[1]).toEqual((10 / 8) * 1)
    expect(value5[0]).toEqual((24 / 8) * 1)
    expect(value5[1]).toEqual((24 / 8) * 1)
  })

  it('should return value for Scrapped Planners', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I27', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I27', 5)
    expect(value1[0]).toEqual((4 / 4) * 1)
    expect(value1[1]).toEqual(((4 + 1) / 4) * 1)
    expect(value5[0]).toEqual((8 / 4) * 1)
    expect(value5[1]).toEqual(((8 + 5) / 4) * 1)
  })

  it('should return value for Booming Professors', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'I28', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'I28', 5)
    expect(value1[0]).toEqual((5 / 6) * 0.5)
    expect(value1[1]).toEqual(((5 + 3) / 6) * 0.5)
    expect(value5[0]).toEqual((10 / 6) * 0.5)
    expect(value5[1]).toEqual(((10 + 6) / 6) * 0.5)
  })

  it('should return value for Brood Sages', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F1', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F1', 5)
    expect(value1[0]).toEqual((2 / 2) * 0.5)
    expect(value1[1]).toEqual(((2 + 10 * 1) / 2) * 1)
    expect(value5[0]).toEqual((5 / 2) * 0.5)
    expect(value5[1]).toEqual(((5 + 10 * 1) / 2) * 1)
  })

  it('should return value for Copperskin Ranger', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F2', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F2', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual((1 / 2) * 0.5)
    expect(value5[0]).toEqual((3 / 2) * 0.5)
    expect(value5[1]).toEqual((3 / 2) * 0.5)
  })

  it('should return value for Dubious Hags', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F3', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F3', 5)
    expect(value1[0]).toEqual(((2 - 1) / 2) * 1)
    expect(value1[1]).toEqual((2 / 2) * 1)
    expect(value5[0]).toEqual(((6 - 1) / 2) * 1)
    expect(value5[1]).toEqual((6 / 2) * 1)
  })

  it('should return value for Toxic Sacrifice', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F4', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F4', 5)
    expect(value1[0]).toEqual((1 - 10) / 2)
    expect(value1[1]).toEqual((8 * 2 - 1) / 2)
    expect(value5[0]).toEqual((1 - 24) / 2)
    expect(value5[1]).toEqual((8 * 6 - 1) / 2)
  })

  it('should return value for Crimson Sentry', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F5', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F5', 5)
    expect(value1[0]).toEqual((1 / 3) * 1.5)
    expect(value1[1]).toEqual(((1 + 4 * 1) / 3) * 1.5)
    expect(value5[0]).toEqual((1 / 3) * 1.5)
    expect(value5[1]).toEqual(((1 + 4 * 5) / 3) * 1.5)
  })

  it('should return value for Harpies of the Hunt', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F6', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F6', 5)
    expect(value1[0]).toEqual((4 / 3) * 0.5)
    expect(value1[1]).toEqual((4 / 3) * 0.5)
    expect(value5[0]).toEqual((8 / 3) * 0.5)
    expect(value5[1]).toEqual((8 / 3) * 0.5)
  })

  it('should return value for Heliotroopers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F7', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F7', 5)
    expect(value1[0]).toEqual((3 / 3) * 1)
    expect(value1[1]).toEqual((3 / 3) * 1)
    expect(value5[0]).toEqual((7 / 3) * 1)
    expect(value5[1]).toEqual((7 / 3) * 1)
  })

  it('should return value for Rain of Frogs', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F8', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F8', 5)
    expect(value1[0]).toEqual((3 * 1) / 2)
    expect(value1[1]).toEqual((3 * 1) / 2)
    expect(value5[0]).toEqual((6 * 1) / 2)
    expect(value5[1]).toEqual((6 * 1) / 2)
  })

  it('should return value for Wandering Wyrms', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F9', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F9', 5)
    expect(value1[0]).toEqual((3 / 3) * 0.5)
    expect(value1[1]).toEqual(((3 + 3) / 3) * 0.5)
    expect(value5[0]).toEqual((3 / 3) * 0.5)
    expect(value5[1]).toEqual(((3 + 7) / 3) * 0.5)
  })

  it('should return value for Azure Hatcher', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F10', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F10', 5)
    expect(value1[0]).toEqual((1 / 4) * 1.5)
    expect(value1[1]).toEqual(((1 + 2 * 1) / 4) * 1.5)
    expect(value5[0]).toEqual((1 / 4) * 1.5)
    expect(value5[1]).toEqual(((1 + 6 * 1) / 4) * 1.5)
  })

  it('should return value for Marked as Prey', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F11', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F11', 5)
    expect(value1[0]).toEqual(1 / 4)
    expect(value1[1]).toEqual((5 * 2) / 4)
    expect(value5[0]).toEqual(1 / 4)
    expect(value5[1]).toEqual((10 * 2) / 4)
  })

  it('should return value for Tode the Elevated', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F12', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F12', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + 2) / 4) * 1)
    expect(value5[0]).toEqual((7 / 4) * 1)
    expect(value5[1]).toEqual(((7 + 6) / 4) * 1)
  })

  it('should return value for Venomfall Spire', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F13', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F13', 5)
    expect(value1[0]).toEqual(4 / 4)
    expect(value1[1]).toEqual(4 / 4)
    expect(value5[0]).toEqual(8 / 4)
    expect(value5[1]).toEqual(8 / 4)
  })

  it('should return value for Witches of the Wild', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F14', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F14', 5)
    expect(value1[0]).toEqual((2 / 4) * 1)
    expect(value1[1]).toEqual(((2 + 1 * 4 * 2) / 4) * 1)
    expect(value5[0]).toEqual((5 / 4) * 1)
    expect(value5[1]).toEqual(((5 + 3 * 4 * 2) / 4) * 1)
  })

  it('should return value for Amberhides', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F15', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F15', 5)
    expect(value1[0]).toEqual((4 / 5) * 1)
    expect(value1[1]).toEqual(((4 + 4 * 2) / 5) * 1)
    expect(value5[0]).toEqual((8 / 5) * 1)
    expect(value5[1]).toEqual(((8 + 8 * 2) / 5) * 1)
  })

  it('should return value for Feral Shamans', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F16', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F16', 5)
    expect(value1[0]).toEqual((1 / 5) * 1)
    expect(value1[1]).toEqual(((1 + 3 * 2) / 5) * 1)
    expect(value5[0]).toEqual((3 / 5) * 1)
    expect(value5[1]).toEqual(((3 + 6 * 2) / 5) * 1)
  })

  it('should return value for Obsidian Butchers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F17', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F17', 5)
    expect(value1[0]).toEqual((2 / 5) * 1.5)
    expect(value1[1]).toEqual(((2 + 2 * 10) / 5) * 1.5)
    expect(value5[0]).toEqual((6 / 5) * 1.5)
    expect(value5[1]).toEqual(((6 + 2 * 10) / 5) * 1.5)
  })

  it('should return value for Soulcrushers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F18', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F18', 5)
    expect(value1[0]).toEqual((5 / 5) * 1)
    expect(value1[1]).toEqual(((5 * 2 - 1) / 5) * 1)
    expect(value5[0]).toEqual((10 / 5) * 1)
    expect(value5[1]).toEqual(((10 * 2 - 1) / 5) * 1)
  })

  it('should return value for Sunbeam Serpents', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F19', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F19', 5)
    expect(value1[0]).toEqual((2 / 5) * 1)
    expect(value1[1]).toEqual(((2 + 10) / 5) * 1)
    expect(value5[0]).toEqual((6 / 5) * 1)
    expect(value5[1]).toEqual(((6 + 24) / 5) * 1)
  })

  it('should return value for Blood Ministers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F20', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F20', 5)
    expect(value1[0]).toEqual((5 / 6) * 0.5)
    expect(value1[1]).toEqual(((5 + 4 * 3 * 2) / 6) * 0.5)
    expect(value5[0]).toEqual((10 / 6) * 0.5)
    expect(value5[1]).toEqual(((10 + 4 * 7 * 2) / 6) * 0.5)
  })

  it('should return value for Broodmother Qordia', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F21', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F21', 5)
    expect(value1[0]).toEqual((5 / 6) * 1)
    expect(value1[1]).toEqual(((5 + 3 * 3) / 6) * 1)
    expect(value5[0]).toEqual((10 / 6) * 1)
    expect(value5[1]).toEqual(((10 + 3 * 7) / 6) * 1)
  })

  it('should return value for Curse of Strings', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F22', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F22', 5)
    expect(value1[0]).toEqual((1 * 2) / 6)
    expect(value1[1]).toEqual((7 * 2) / 6)
    expect(value5[0]).toEqual((1 * 2) / 6)
    expect(value5[1]).toEqual((17 * 2) / 6)
  })

  it('should return value for High Priestess Klaxi', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F23', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F23', 5)
    expect(value1[0]).toEqual((5 / 8) * 0.5)
    expect(value1[1]).toEqual(((5 + 10 * 5 * 2) / 8) * 2)
    expect(value5[0]).toEqual((10 / 8) * 0.5)
    expect(value5[1]).toEqual(((10 + 10 * 10 * 2) / 8) * 2)
  })

  it('should return value for Clerics with Cords', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F24', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F24', 5)
    expect(value1[0]).toEqual((3 / 4) * 0.5)
    expect(value1[1]).toEqual(((3 + 2 * 2) / 4) * 1)
    expect(value5[0]).toEqual((7 / 4) * 0.5)
    expect(value5[1]).toEqual(((7 + 6 * 2) / 4) * 1)
  })

  it('should return value for Limelimbs', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F25', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F25', 5)
    expect(value1[0]).toEqual((1 / 3) * 1.5)
    expect(value1[1]).toEqual((1 / 3) * 1.5)
    expect(value5[0]).toEqual((5 / 3) * 1.5)
    expect(value5[1]).toEqual((5 / 3) * 1.5)
  })

  it('should return value for Untamed Cultists', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F26', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F26', 5)
    expect(value1[0]).toEqual((10 / 7) * 0.5)
    expect(value1[1]).toEqual((10 / 7) * 0.5)
    expect(value5[0]).toEqual((24 / 7) * 0.5)
    expect(value5[1]).toEqual((24 / 7) * 0.5)
  })

  it('should return value for Faithless Prophets', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F27', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F27', 5)
    expect(value1[0]).toEqual(((1 - 4 * 2) / 3) * 1)
    expect(value1[1]).toEqual((5 / 3) * 1)
    expect(value5[0]).toEqual(((1 - 9 * 2) / 3) * 1)
    expect(value5[1]).toEqual((10 / 3) * 1)
  })

  it('should return value for Hairy Chestnuts', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'F28', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'F28', 5)
    expect(value1[0]).toEqual((5 / 6) * 0.5)
    expect(value1[1]).toEqual(((5 + 2 * 1) / 6) * 0.5)
    expect(value5[0]).toEqual((12 / 6) * 0.5)
    expect(value5[1]).toEqual(((12 + 2 * 2) / 6) * 0.5)
  })

  it('should return value for Doppelbocks', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S1', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S1', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual(((1 + 1) / 2) * 1)
    expect(value5[0]).toEqual((3 / 2) * 0.5)
    expect(value5[1]).toEqual(((3 + 3) / 2) * 1)
  })

  it('should return value for Restless Goats', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S2', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S2', 5)
    expect(value1[0]).toEqual(((1 - 2) / 2) * 1.5)
    expect(value1[1]).toEqual(((1 - 2) / 2) * 1.5)
    expect(value5[0]).toEqual(((5 - 2) / 2) * 1.5)
    expect(value5[1]).toEqual(((5 - 2) / 2) * 1.5)
  })

  it('should return value for Counselor Ahmi', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S3', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S3', 5)
    expect(value1[0]).toEqual((1 / 3) * 1)
    expect(value1[1]).toEqual((1 / 3) * 1)
    expect(value5[0]).toEqual((5 / 3) * 1)
    expect(value5[1]).toEqual((5 / 3) * 1)
  })

  it('should return value for Dreadful Keepers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S4', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S4', 5)
    expect(value1[0]).toEqual((3 / 3) * 0.5)
    expect(value1[1]).toEqual(((3 + 3) / 3) * 0.5)
    expect(value5[0]).toEqual((7 / 3) * 0.5)
    expect(value5[1]).toEqual(((7 + 8) / 3) * 0.5)
  })

  it('should return value for Faun Companions', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S5', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S5', 5)
    expect(value1[0]).toEqual((1 / 3) * 1)
    expect(value1[1]).toEqual(((1 + 3) / 3) * 1)
    expect(value5[0]).toEqual((3 / 3) * 1)
    expect(value5[1]).toEqual(((3 + 6) / 3) * 1)
  })

  it.skip('should return value for Forgotten Souls', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S6', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S6', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Moonlit Aerie', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S7', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S7', 5)
    expect(value1[0]).toEqual(3 / 3)
    expect(value1[1]).toEqual((3 + MAX_TILES * 1) / 3)
    expect(value5[0]).toEqual(6 / 3)
    expect(value5[1]).toEqual((6 + MAX_TILES * 3) / 3)
  })

  it('should return value for Shady Ghoul', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S8', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S8', 5)
    expect(value1[0]).toEqual((1 / 3) * 1.5)
    expect(value1[1]).toEqual(((1 + 1) / 3) * 1.5)
    expect(value5[0]).toEqual((1 / 3) * 1.5)
    expect(value5[1]).toEqual(((1 + 5) / 3) * 1.5)
  })

  it('should return value for Swarmcallers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S9', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S9', 5)
    expect(value1[0]).toEqual((1 / 3) * 1)
    expect(value1[1]).toEqual(((1 + 2 * 4) / 3) * 1)
    expect(value5[0]).toEqual((3 / 3) * 1)
    expect(value5[1]).toEqual(((3 + 4 * 4) / 3) * 1)
  })

  it('should return value for Broken Truce', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S10', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S10', 5)
    expect(value1[0]).toEqual((1 - 3) / 4)
    expect(value1[1]).toEqual((8 - 3) / 4)
    expect(value5[0]).toEqual((1 - 3) / 4)
    expect(value5[1]).toEqual((18 - 3) / 4)
  })

  it('should return value for Devastators', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S11', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S11', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + 3) / 4) * 1)
    expect(value5[0]).toEqual((6 / 4) * 1)
    expect(value5[1]).toEqual(((6 + 6) / 4) * 1)
  })

  it('should return value for Draconic Roamers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S12', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S12', 5)
    expect(value1[0]).toEqual((2 / 4) * 1.5)
    expect(value1[1]).toEqual(((2 + 1 * 2) / 4) * 1.5)
    expect(value5[0]).toEqual((4 / 4) * 1.5)
    expect(value5[1]).toEqual(((4 + 3 * 2) / 4) * 1.5)
  })

  it('should return value for Mischiefs', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S13', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S13', 5)
    expect(value1[0]).toEqual(((2 + 1) / 4) * 1)
    expect(value1[1]).toEqual(((2 + 1) / 4) * 1)
    expect(value5[0]).toEqual(((5 + 2) / 4) * 1)
    expect(value5[1]).toEqual(((5 + 2) / 4) * 1)
  })

  it('should return value for Pan Heralds', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S14', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S14', 5)
    expect(value1[0]).toEqual((3 / 4) * 0.5)
    expect(value1[1]).toEqual(((3 + 1 * 8) / 4) * 0.5)
    expect(value5[0]).toEqual((6 / 4) * 0.5)
    expect(value5[1]).toEqual(((6 + 3 * 8) / 4) * 0.5)
  })

  it('should return value for Dark Harvest', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S15', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S15', 5)
    expect(value1[0]).toEqual(2 / 5)
    expect(value1[1]).toEqual((2 * MAX_TILES) / 5)
    expect(value5[0]).toEqual(6 / 5)
    expect(value5[1]).toEqual((6 * MAX_TILES) / 5)
  })

  it('should return value for Dreadfauns', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S16', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S16', 5)
    expect(value1[0]).toEqual((3 / 5) * 0.5)
    expect(value1[1]).toEqual(((3 + 2 * 2) / 5) * 1)
    expect(value5[0]).toEqual((6 / 5) * 0.5)
    expect(value5[1]).toEqual(((6 + 2 * 4) / 5) * 1)
  })

  it('should return value for Grim Couriers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S17', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S17', 5)
    expect(value1[0]).toEqual((3 / 5) * 1.75)
    expect(value1[1]).toEqual((3 / 5) * 1.75)
    expect(value5[0]).toEqual((7 / 5) * 1.75)
    expect(value5[1]).toEqual((7 / 5) * 1.75)
  })

  it('should return value for Pillars of Doom', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S18', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S18', 5)
    expect(value1[0]).toEqual(4 / 5)
    expect(value1[1]).toEqual((4 + 2) / 5)
    expect(value5[0]).toEqual(8 / 5)
    expect(value5[1]).toEqual((8 + 4) / 5)
  })

  it('should return value for Xuri, Lord of Life', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S19', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S19', 5)
    expect(value1[0]).toEqual((3 / 5) * 0.5)
    expect(value1[1]).toEqual(((3 + 3 * 3) / 5) * 2)
    expect(value5[0]).toEqual((7 / 5) * 0.5)
    expect(value5[1]).toEqual(((7 + 3 * 7) / 5) * 2)
  })

  it.skip('should return value for Herald’s Hymn', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S20', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S20', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Queen of Herds', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S21', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S21', 5)
    expect(value1[0]).toEqual((8 / 7) * 0.5)
    expect(value1[1]).toEqual(((8 + 3 + 8 * 1) / 7) * 0.5)
    expect(value5[0]).toEqual((14 / 7) * 0.5)
    expect(value5[1]).toEqual(((14 + (6 + 4 + 4) + 6 + 8 * 3) / 7) * 0.5)
  })

  it('should return value for Vindicators', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S22', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S22', 5)
    expect(value1[0]).toEqual((3 / 6) * 1.75)
    expect(value1[1]).toEqual(((3 + 1 * 1.75) / 6) * 1.75)
    expect(value5[0]).toEqual((6 / 6) * 1.75)
    expect(value5[1]).toEqual(((6 + 2 * 1.75) / 6) * 1.75)
  })

  it('should return value for Lasting Remains', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S23', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S23', 5)
    expect(value1[0]).toEqual((8 / 7) * 1)
    expect(value1[1]).toEqual((8 / 7) * 2)
    expect(value5[0]).toEqual((15 / 7) * 1)
    expect(value5[1]).toEqual((15 / 7) * 2)
  })

  it('should return value for Head Start', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S24', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S24', 5)
    expect(value1[0]).toEqual((3 / 2) * 0.5)
    expect(value1[1]).toEqual((3 / 2) * 0.5)
    expect(value5[0]).toEqual((7 / 2) * 0.5)
    expect(value5[1]).toEqual((7 / 2) * 0.5)
  })

  it('should return value for Mindless Horde', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S25', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S25', 5)
    expect(value1[0]).toEqual((4 / 3) * 0.5)
    expect(value1[1]).toEqual((4 / 3) * 0.5)
    expect(value5[0]).toEqual((8 / 3) * 0.5)
    expect(value5[1]).toEqual((8 / 3) * 0.5)
  })

  it('should return value for Obliterators', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S26', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S26', 5)
    expect(value1[0]).toEqual((4 / 6) * 1.5)
    expect(value1[1]).toEqual((4 / 6) * 1.5)
    expect(value5[0]).toEqual((8 / 6) * 1.5)
    expect(value5[1]).toEqual((8 / 6) * 1.5)
  })

  it.skip('should return value for Petrified Fossils', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S27', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S27', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Bucks of Wasteland', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'S28', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'S28', 5)
    expect(value1[0]).toEqual((6 / 6) * 0.5)
    expect(value1[1]).toEqual(((6 + 5 * 2) / 6) * 0.5)
    expect(value5[0]).toEqual((14 / 6) * 0.5)
    expect(value5[1]).toEqual(((14 + 13 * 2) / 6) * 0.5)
  })

  it('should return value for Icicle Burst', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W1', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W1', 5)
    expect(value1[0]).toEqual(1 / 1)
    expect(value1[1]).toEqual(8 / 1)
    expect(value5[0]).toEqual(1 / 1)
    expect(value5[1]).toEqual(18 / 1)
  })

  it('should return value for Frosthexers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W2', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W2', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual((1 / 2) * 0.5)
    expect(value5[0]).toEqual((5 / 2) * 0.5)
    expect(value5[1]).toEqual((5 / 2) * 0.5)
  })

  it('should return value for The Hearth', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W3', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W3', 5)
    expect(value1[0]).toEqual(3 / 3)
    expect(value1[1]).toEqual((3 + 2) / 3)
    expect(value5[0]).toEqual(6 / 3)
    expect(value5[1]).toEqual((6 + 4) / 3)
  })

  it('should return value for Wisp Cloud', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W4', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W4', 5)
    expect(value1[0]).toEqual((1 / 3) * 1)
    expect(value1[1]).toEqual(((1 + 4 * 8) / 3) * 1)
    expect(value5[0]).toEqual((5 / 3) * 1)
    expect(value5[1]).toEqual(((5 + 8 * 8) / 3) * 1)
  })

  it('should return value for Yowling Weavers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W5', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W5', 5)
    expect(value1[0]).toEqual((4 / 3) * 1)
    expect(value1[1]).toEqual((4 / 3) * 1)
    expect(value5[0]).toEqual((8 / 3) * 1)
    expect(value5[1]).toEqual((8 / 3) * 1)
  })

  it('should return value for Moment’s Peace', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W6', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W6', 5)
    expect(value1[0]).toEqual(5 / 5)
    expect(value1[1]).toEqual(5 / 5)
    expect(value5[0]).toEqual(9 / 5)
    expect(value5[1]).toEqual(9 / 5)
  })

  it('should return value for Mystwives', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W7', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W7', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + 4) / 4) * 1)
    expect(value5[0]).toEqual((3 / 4) * 1)
    expect(value5[1]).toEqual(((3 + 8) / 4) * 1)
  })

  it.skip('should return value for Spellbinder Zhevana', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W8', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W8', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it.skip('should return value for Frozen Core', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W9', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W9', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Lady Rime', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W10', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W10', 5)
    expect(value1[0]).toEqual((5 / 6) * 1)
    expect(value1[1]).toEqual(((5 + 2 * (MAX_MANA - 6)) / MAX_MANA) * 1)
    expect(value5[0]).toEqual((10 / 6) * 1)
    expect(value5[1]).toEqual(((10 + 5 * (MAX_MANA - 6)) / MAX_MANA) * 1)
  })

  it.skip('should return value for Midwinter Chaos', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W11', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W11', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Rimelings', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W12', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W12', 5)
    expect(value1[0]).toEqual((2 / 2) * 1)
    expect(value1[1]).toEqual((2 / 2) * 1)
    expect(value5[0]).toEqual((6 / 2) * 1)
    expect(value5[1]).toEqual((6 / 2) * 1)
  })

  it('should return value for Rockworkers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W13', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W13', 5)
    expect(value1[0]).toEqual((4 / 5) * 0.5)
    expect(value1[1]).toEqual(((4 + 4) / 5) * 1)
    expect(value5[0]).toEqual((8 / 5) * 0.5)
    expect(value5[1]).toEqual(((8 + 8) / 5) * 1)
  })

  it('should return value for Blessed with Brawn', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W14', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W14', 5)
    expect(value1[0]).toEqual(8 / 6)
    expect(value1[1]).toEqual(8 / 6)
    expect(value5[0]).toEqual(18 / 6)
    expect(value5[1]).toEqual(18 / 6)
  })

  it('should return value for Broken Earth Drakes', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W15', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W15', 5)
    expect(value1[0]).toEqual(((2 - 3 * 18) / 6) * 1)
    expect(value1[1]).toEqual(((2 + 3 * 18) / 6) * 1)
    expect(value5[0]).toEqual(((2 - 7 * 18) / 6) * 1)
    expect(value5[1]).toEqual(((2 + 7 * 18) / 6) * 1)
  })

  it('should return value for Dawnsparks', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W16', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W16', 5)
    expect(value1[0]).toEqual((8 / 6) * 0.5)
    expect(value1[1]).toEqual((8 / 6) * 0.5)
    expect(value5[0]).toEqual((18 / 6) * 0.5)
    expect(value5[1]).toEqual((18 / 6) * 0.5)
  })

  it('should return value for Wolfcloaks', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W17', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W17', 5)
    expect(value1[0]).toEqual((1 / 6) * 1.5)
    expect(value1[1]).toEqual((7 / 6) * 1.5)
    expect(value5[0]).toEqual((1 / 6) * 1.5)
    expect(value5[1]).toEqual((13 / 6) * 1.5)
  })

  it('should return value for Fleshmenders', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W18', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W18', 5)
    expect(value1[0]).toEqual((5 / 7) * 1.5)
    expect(value1[1]).toEqual(((5 + 6) / 7) * 1.5)
    expect(value5[0]).toEqual((9 / 7) * 1.5)
    expect(value5[1]).toEqual(((9 + 12) / 7) * 1.5)
  })

  it('should return value for Gift of the Wise', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W19', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W19', 5)
    expect(value1[0]).toEqual(2)
    expect(value1[1]).toEqual(2)
    expect(value5[0]).toEqual(6)
    expect(value5[1]).toEqual(6)
  })

  it('should return value for Calming Spirits', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W20', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W20', 5)
    expect(value1[0]).toEqual((10 / 7) * 0.5)
    expect(value1[1]).toEqual((10 / 7) * 0.5)
    expect(value5[0]).toEqual((24 / 7) * 0.5)
    expect(value5[1]).toEqual((24 / 7) * 0.5)
  })

  it('should return value for Visions of the Grove', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W21', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W21', 5)
    expect(value1[0]).toEqual((8 / 8) * 0.5)
    expect(value1[1]).toEqual(((8 + ((MAX_MANA - 8) / 4) * 5) / 8) * 0.5)
    expect(value5[0]).toEqual((18 / 8) * 0.5)
    expect(value5[1]).toEqual(((18 + ((MAX_MANA - 8) / 2) * 5) / 8) * 0.5)
  })

  it('should return value for Chillbeards', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W22', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W22', 5)
    expect(value1[0]).toEqual((4 / 9) * 1.5)
    expect(value1[1]).toEqual(((4 + 3) / 9) * 1.5)
    expect(value5[0]).toEqual((8 / 9) * 1.5)
    expect(value5[1]).toEqual(((8 + 7) / 9) * 1.5)
  })

  it('should return value for Olf the Hammer', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W23', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W23', 5)
    expect(value1[0]).toEqual((6 / 9) * 1.5)
    expect(value1[1]).toEqual(((6 + 3) / 9) * 1.5)
    expect(value5[0]).toEqual((12 / 9) * 1.5)
    expect(value5[1]).toEqual(((12 + 6) / 9) * 1.5)
  })

  it.skip('should return value for Underground Spring', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W24', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W24', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Iced Droplings', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W25', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W25', 5)
    expect(value1[0]).toEqual((7 / 6) * 1)
    expect(value1[1]).toEqual((7 / 6) * 1)
    expect(value5[0]).toEqual((15 / 6) * 1)
    expect(value5[1]).toEqual((15 / 6) * 1)
  })

  it('should return value for Sleetstompers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W26', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W26', 5)
    expect(value1[0]).toEqual((6 / 8) * 1.5)
    expect(value1[1]).toEqual((6 / 8) * 1.5)
    expect(value5[0]).toEqual((12 / 8) * 1.5)
    expect(value5[1]).toEqual((12 / 8) * 1.5)
  })

  it('should return value for Earthfathers', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W27', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W27', 5)
    expect(value1[0]).toEqual((5 / 7) * 1)
    expect(value1[1]).toEqual(((5 + 3) / 7) * 1)
    expect(value5[0]).toEqual((11 / 7) * 1)
    expect(value5[1]).toEqual(((11 + 4) / 7) * 1)
  })

  it('should return value for Chilled Stonedames', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W28', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W28', 5)
    expect(value1[0]).toEqual((4 / 5) * 1)
    expect(value1[1]).toEqual(((4 + 2 * 4) / 5) * 1)
    expect(value5[0]).toEqual((8 / 5) * 1)
    expect(value5[1]).toEqual(((8 + 6 * 4) / 5) * 1)
  })

  it('should return value for Iceflakes', () => {
    const value1 = getCardValue(global.__CARDS_INDEX__, 'W31', 1)
    const value5 = getCardValue(global.__CARDS_INDEX__, 'W31', 5)
    expect(value1[0]).toEqual((3 / 2) * -0.5)
    expect(value1[1]).toEqual((3 / 2) * -0.5)
    expect(value5[0]).toEqual((7 / 2) * -0.5)
    expect(value5[1]).toEqual((7 / 2) * -0.5)
  })
})
