import { RACES } from '~/constants/game'
import getCardValue, { MAX_TILES, MAX_MANA } from './'

describe('The `getCardValue` helper', () => {
  it('should return value for Green Prototypes', () => {
    const value1 = getCardValue('N1', 1)
    const value5 = getCardValue('N1', 5)
    expect(value1[0]).toEqual(0)
    expect(value1[1]).toEqual((1 / 1) * 1)
    expect(value5[0]).toEqual(0)
    expect(value5[1]).toEqual((5 / 1) * 1)
  })

  it('should return value for Summon Militia', () => {
    const value1 = getCardValue('N2', 1)
    const value5 = getCardValue('N2', 5)
    expect(value1[0]).toEqual((1 / 1) * 0.5)
    expect(value1[1]).toEqual((1 / 1) * 0.5)
    expect(value5[0]).toEqual((5 / 1) * 0.5)
    expect(value5[1]).toEqual((5 / 1) * 0.5)
  })

  it('should return value for Gifted Recruits', () => {
    const value1 = getCardValue('N3', 1)
    const value5 = getCardValue('N3', 5)
    expect(value1[0]).toEqual((1 / 2) * 1)
    expect(value1[1]).toEqual((1 / 2) * 1)
    expect(value5[0]).toEqual((5 / 2) * 1)
    expect(value5[1]).toEqual((5 / 2) * 1)
  })

  it('should return value for Lawless Herd', () => {
    const value1 = getCardValue('N4', 1)
    const value5 = getCardValue('N4', 5)
    expect(value1[0]).toEqual((2 / 2) * 0.5)
    expect(value1[1]).toEqual((2 / 2) * 0.5)
    expect(value5[0]).toEqual((6 / 2) * 0.5)
    expect(value5[1]).toEqual((6 / 2) * 0.5)
  })

  it('should return value for Northsea Dog', () => {
    const value1 = getCardValue('N5', 1)
    const value5 = getCardValue('N5', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual(((1 + 5) / 2) * 0.5)
    expect(value5[0]).toEqual((1 / 2) * 0.5)
    expect(value5[1]).toEqual(((1 + 10) / 2) * 0.5)
  })

  it('should return value for Spare Dragonling', () => {
    const value1 = getCardValue('N6', 1)
    const value5 = getCardValue('N6', 5)
    expect(value1[0]).toEqual((1 / 2) * 1)
    expect(value1[1]).toEqual(((1 + 3) / 2) * 1)
    expect(value5[0]).toEqual((1 / 2) * 1)
    expect(value5[1]).toEqual(((1 + 7) / 2) * 1)
  })

  it('should return value for Brothers in Arms', () => {
    const value1 = getCardValue('N7', 1)
    const value5 = getCardValue('N7', 5)
    expect(value1[0]).toEqual((3 / 3) * 0.5)
    expect(value1[1]).toEqual(((3 + 1) / 3) * 0.5)
    expect(value5[0]).toEqual((6 / 3) * 0.5)
    expect(value5[1]).toEqual(((6 + 3) / 3) * 0.5)
  })

  it('should return value for Collector Mirz', () => {
    const value1 = getCardValue('N8', 1)
    const value5 = getCardValue('N8', 5)
    expect(value1[0]).toEqual(((1 + 5) / 3) * 0.5)
    expect(value1[1]).toEqual(((1 + 5) / 3) * 0.5)
    expect(value5[0]).toEqual(((3 + 10) / 3) * 0.5)
    expect(value5[1]).toEqual(((3 + 10) / 3) * 0.5)
  })

  it('should return value for Confinement', () => {
    const value1 = getCardValue('N9', 1)
    const value5 = getCardValue('N9', 5)
    expect(value1[0]).toEqual(1 / 3)
    expect(value1[1]).toEqual((10 - 5) / 3)
    expect(value5[0]).toEqual(1 / 3)
    expect(value5[1]).toEqual((24 - 1) / 3)
  })

  it('should return value for Conflicted Drakes', () => {
    const value1 = getCardValue('N10', 1)
    const value5 = getCardValue('N10', 5)
    expect(value1[0]).toEqual((2 / 3) * 0.5)
    expect(value1[1]).toEqual(((2 + 1 * 4) / 3) * 0.5)
    expect(value5[0]).toEqual((4 / 3) * 0.5)
    expect(value5[1]).toEqual(((4 + 3 * 4) / 3) * 0.5)
  })

  it('should return value for Felflares', () => {
    const value1 = getCardValue('N11', 1)
    const value5 = getCardValue('N11', 5)
    expect(value1[0]).toEqual((2 / 3) * 0.5)
    expect(value1[1]).toEqual(((2 + 2) / 3) * 0.5)
    expect(value5[0]).toEqual((2 / 3) * 0.5)
    expect(value5[1]).toEqual(((2 + 6) / 3) * 0.5)
  })

  it('should return value for First Mutineer', () => {
    const value1 = getCardValue('N12', 1)
    const value5 = getCardValue('N12', 5)
    expect(value1[0]).toEqual((1 / 3) * 1.5)
    expect(value1[1]).toEqual((1 / 3) * 1.5)
    expect(value5[0]).toEqual((5 / 3) * 1.5)
    expect(value5[1]).toEqual((5 / 3) * 1.5)
  })

  it('should return value for Fort of Ebonrock', () => {
    const value1 = getCardValue('N13', 1)
    const value5 = getCardValue('N13', 5)
    expect(value1[0]).toEqual(4 / 3)
    expect(value1[1]).toEqual(4 / 3)
    expect(value5[0]).toEqual(8 / 3)
    expect(value5[1]).toEqual(8 / 3)
  })

  it('should return value for Freebooters', () => {
    const value1 = getCardValue('N14', 1)
    const value5 = getCardValue('N14', 5)
    expect(value1[0]).toEqual((2 / 3) * 0.5)
    expect(value1[1]).toEqual((2 / 3) * 0.5)
    expect(value5[0]).toEqual((5 / 3) * 0.5)
    expect(value5[1]).toEqual((5 / 3) * 0.5)
  })

  it('should return value for Potion of Growth', () => {
    const value1 = getCardValue('N15', 1)
    const value5 = getCardValue('N15', 5)
    expect(value1[0]).toEqual(2 / 3)
    expect(value1[1]).toEqual(2 / 3)
    expect(value5[0]).toEqual(6 / 3)
    expect(value5[1]).toEqual(6 / 3)
  })

  it('should return value for Westwind Sailors', () => {
    const value1 = getCardValue('N16', 1)
    const value5 = getCardValue('N16', 5)
    expect(value1[0]).toEqual((2 / 3) * 1)
    expect(value1[1]).toEqual((2 / 3) * 1)
    expect(value5[0]).toEqual((6 / 3) * 1)
    expect(value5[1]).toEqual((6 / 3) * 1)
  })

  it('should return value for Wetland Deceivers', () => {
    const value1 = getCardValue('N17', 1)
    const value5 = getCardValue('N17', 5)
    expect(value1[0]).toEqual(((3 - 8 * 1) / 3) * 0.5)
    expect(value1[1]).toEqual(((3 + 8 * 1) / 3) * 0.5)
    expect(value5[0]).toEqual(((7 - 8 * 3) / 3) * 0.5)
    expect(value5[1]).toEqual(((7 + 8 * 3) / 3) * 0.5)
  })

  it('should return value for Beasts of Terror', () => {
    const value1 = getCardValue('N18', 1)
    const value5 = getCardValue('N18', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + 2 * MAX_TILES) / 4) * 1)
    expect(value5[0]).toEqual((6 / 4) * 1)
    expect(value5[1]).toEqual(((6 + 4 * MAX_TILES) / 4) * 1)
  })

  it('should return value for Cabin Girls', () => {
    const value1 = getCardValue('N19', 1)
    const value5 = getCardValue('N19', 5)
    expect(value1[0]).toEqual((5 / 4) * 0.5)
    expect(value1[1]).toEqual((5 / 4) * 0.5)
    expect(value5[0]).toEqual((10 / 4) * 0.5)
    expect(value5[1]).toEqual((10 / 4) * 0.5)
  })

  it('should return value for Emerald Towers', () => {
    const value1 = getCardValue('N20', 1)
    const value5 = getCardValue('N20', 5)
    expect(value1[0]).toEqual(4 / 4)
    expect(value1[1]).toEqual((4 + 2 * 4) / 4)
    expect(value5[0]).toEqual(8 / 4)
    expect(value5[1]).toEqual((8 + 4 * 4) / 4)
  })

  it('should return value for Execution', () => {
    const value1 = getCardValue('N21', 1)
    const value5 = getCardValue('N21', 5)
    expect(value1[0]).toEqual(1 / 4)
    expect(value1[1]).toEqual(4 / 4)
    expect(value5[0]).toEqual(1 / 4)
    expect(value5[1]).toEqual(8 / 4)
  })

  it('should return value for Goldgrubbers', () => {
    const value1 = getCardValue('N22', 1)
    const value5 = getCardValue('N22', 5)
    expect(value1[0]).toEqual((4 / 4) * 1)
    expect(value1[1]).toEqual((4 / 4) * 1)
    expect(value5[0]).toEqual((8 / 4) * 1)
    expect(value5[1]).toEqual((8 / 4) * 1)
  })

  it('should return value for Hunter’s Vengeance', () => {
    const types = Object.keys(RACES).length + 2
    const value1 = getCardValue('N23', 1)
    const value5 = getCardValue('N23', 5)
    expect(value1[0]).toEqual((-2 * types) / 3)
    expect(value1[1]).toEqual((2 * types) / 3)
    expect(value5[0]).toEqual((-6 * types) / 3)
    expect(value5[1]).toEqual((6 * types) / 3)
  })

  it('should return value for Personal Servers', () => {
    const value1 = getCardValue('N24', 1)
    const value5 = getCardValue('N24', 5)
    expect(value1[0]).toEqual((1 / 3) * 1)
    expect(value1[1]).toEqual(((1 + 2) / 3) * 1)
    expect(value5[0]).toEqual((3 / 3) * 1)
    expect(value5[1]).toEqual(((3 + 4) / 3) * 1)
  })

  it('should return value for Siegebreakers', () => {
    const value1 = getCardValue('N25', 1)
    const value5 = getCardValue('N25', 5)
    expect(value1[0]).toEqual((4 / 4) * 1)
    expect(value1[1]).toEqual(((4 + 4 * 8) / 4) * 1)
    expect(value5[0]).toEqual((8 / 4) * 1)
    expect(value5[1]).toEqual(((8 + 8 * 8) / 4) * 1)
  })

  it('should return value for Snowmasons', () => {
    const value1 = getCardValue('N26', 1)
    const value5 = getCardValue('N26', 5)
    expect(value1[0]).toEqual((2 / 4) * 1)
    expect(value1[1]).toEqual(((2 + 4) / 4) * 1)
    expect(value5[0]).toEqual((2 / 4) * 1)
    expect(value5[1]).toEqual(((2 + 8) / 4) * 1)
  })

  it('should return value for Terrific Slayers', () => {
    const value1 = getCardValue('N27', 1)
    const value5 = getCardValue('N27', 5)
    expect(value1[0]).toEqual((2 / 4) * 1.5)
    expect(value1[1]).toEqual(((2 + 5 * 2) / 4) * 1.5)
    expect(value5[0]).toEqual((6 / 4) * 1.5)
    expect(value5[1]).toEqual(((6 + 10 * 2) / 4) * 1.5)
  })

  it('should return value for Warfront Runners', () => {
    const value1 = getCardValue('N28', 1)
    const value5 = getCardValue('N28', 5)
    expect(value1[0]).toEqual((2 / 4) * 1.5)
    expect(value1[1]).toEqual((2 / 4) * 1.5)
    expect(value5[0]).toEqual((6 / 4) * 1.5)
    expect(value5[1]).toEqual((6 / 4) * 1.5)
  })

  it('should return value for Bladestorm', () => {
    const value1 = getCardValue('N29', 1)
    const value5 = getCardValue('N29', 5)
    expect(value1[0]).toEqual(1 / 5)
    expect(value1[1]).toEqual((1 * 20) / 5)
    expect(value5[0]).toEqual(4 / 5)
    expect(value5[1]).toEqual((4 * 20) / 5)
  })

  it('should return value for Bluesail Raiders', () => {
    const value1 = getCardValue('N30', 1)
    const value5 = getCardValue('N30', 5)
    expect(value1[0]).toEqual((3 / 5) * 1.5)
    expect(value1[1]).toEqual((3 / 5) * 1.5)
    expect(value5[0]).toEqual((7 / 5) * 1.5)
    expect(value5[1]).toEqual((7 / 5) * 1.5)
  })

  it('should return value for Flooding the Gates', () => {
    const value1 = getCardValue('N31', 1)
    const value5 = getCardValue('N31', 5)
    expect(value1[0]).toEqual((5 * 4) / -4)
    expect(value1[1]).toEqual((5 * 4) / 4)
    expect(value5[0]).toEqual((10 * 4) / -4)
    expect(value5[1]).toEqual((10 * 4) / 4)
  })

  it('should return value for Heroic Soldiers', () => {
    const value1 = getCardValue('N32', 1)
    const value5 = getCardValue('N32', 5)
    expect(value1[0]).toEqual((5 / 5) * 1)
    expect(value1[1]).toEqual((5 / 5) * 1)
    expect(value5[0]).toEqual((10 / 5) * 1)
    expect(value5[1]).toEqual((10 / 5) * 1)
  })

  it('should return value for Snake Eyes', () => {
    const value1 = getCardValue('N33', 1)
    const value5 = getCardValue('N33', 5)
    expect(value1[0]).toEqual((6 / 5) * 0.5)
    expect(value1[1]).toEqual((6 / 5) * 0.5)
    expect(value5[0]).toEqual((12 / 5) * 0.5)
    expect(value5[1]).toEqual((12 / 5) * 0.5)
  })

  it('should return value for Trueshot Post', () => {
    const value1 = getCardValue('N34', 1)
    const value5 = getCardValue('N34', 5)
    expect(value1[0]).toEqual(4 / 5)
    expect(value1[1]).toEqual((4 + 4) / 5)
    expect(value5[0]).toEqual(8 / 5)
    expect(value5[1]).toEqual((8 + 8) / 5)
  })

  it('should return value for Ubass the Hunter', () => {
    const value1 = getCardValue('N35', 1)
    const value5 = getCardValue('N35', 5)
    expect(value1[0]).toEqual((5 / 5) * 0.5)
    expect(value1[1]).toEqual(((5 + 10 * 1) / 5) * 0.5)
    expect(value5[0]).toEqual((10 / 5) * 0.5)
    expect(value5[1]).toEqual(((10 + 10 * 3) / 5) * 0.5)
  })

  it('should return value for Voidsurgers', () => {
    const value1 = getCardValue('N36', 1)
    const value5 = getCardValue('N36', 5)
    expect(value1[0]).toEqual((6 / 5) * 0.5)
    expect(value1[1]).toEqual(((6 + 2 * 8) / 5) * 0.5)
    expect(value5[0]).toEqual((6 / 5) * 0.5)
    expect(value5[1]).toEqual(((6 + 6 * 8) / 5) * 0.5)
  })

  it('should return value for Boomstick Officers', () => {
    const value1 = getCardValue('N37', 1)
    const value5 = getCardValue('N37', 5)
    expect(value1[0]).toEqual((5 / 6) * 1)
    expect(value1[1]).toEqual(((5 + 4) / 6) * 1)
    expect(value5[0]).toEqual((10 / 6) * 1)
    expect(value5[1]).toEqual(((10 + 8) / 6) * 1)
  })

  it.skip('should return value for Harvesters of Souls', () => {
    const value1 = getCardValue('N38', 1)
    const value5 = getCardValue('N38', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Hearthguards', () => {
    const value1 = getCardValue('N39', 1)
    const value5 = getCardValue('N39', 5)
    expect(value1[0]).toEqual((3 / 6) * 1.5)
    expect(value1[1]).toEqual(((3 + 3) / 6) * 1.5)
    expect(value5[0]).toEqual((7 / 6) * 1.5)
    expect(value5[1]).toEqual(((7 + 7) / 6) * 1.5)
  })

  it('should return value for Kindred’s Grace', () => {
    const value1 = getCardValue('N40', 1)
    const value5 = getCardValue('N40', 5)
    expect(value1[0]).toEqual(6 / 6)
    expect(value1[1]).toEqual((6 + 2 * MAX_TILES) / 6)
    expect(value5[0]).toEqual(11 / 6)
    expect(value5[1]).toEqual((11 + 5 * MAX_TILES) / 6)
  })

  it('should return value for Lich Summoners', () => {
    const value1 = getCardValue('N41', 1)
    const value5 = getCardValue('N41', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + 3) / 4) * 1)
    expect(value5[0]).toEqual((6 / 4) * 1)
    expect(value5[1]).toEqual(((6 + 7) / 4) * 1)
  })

  it('should return value for Lucky Charmers', () => {
    const value1 = getCardValue('N42', 1)
    const value5 = getCardValue('N42', 5)
    expect(value1[0]).toEqual((4 / 6) * 1)
    expect(value1[1]).toEqual(((4 + 3 * 3) / 6) * 1)
    expect(value5[0]).toEqual((7 / 6) * 1)
    expect(value5[1]).toEqual(((7 + 6 * 3) / 6) * 1)
  })

  it('should return value for Ludic Matriarchs', () => {
    const value1 = getCardValue('N43', 1)
    const value5 = getCardValue('N43', 5)
    expect(value1[0]).toEqual((5 / 6) * 0.5)
    expect(value1[1]).toEqual(((5 + 1 * 6) / 6) * 0.5)
    expect(value5[0]).toEqual((10 / 6) * 0.5)
    expect(value5[1]).toEqual(((10 + 3 * 6) / 6) * 0.5)
  })

  it('should return value for Needle Blast', () => {
    const value1 = getCardValue('N44', 1)
    const value5 = getCardValue('N44', 5)
    expect(value1[0]).toEqual((2 * 1) / 6)
    expect(value1[1]).toEqual((2 * 2) / 6)
    expect(value5[0]).toEqual((4 * 1) / 6)
    expect(value5[1]).toEqual((4 * 4) / 6)
  })

  it('should return value for Powder Tower', () => {
    const value1 = getCardValue('N45', 1)
    const value5 = getCardValue('N45', 5)
    expect(value1[0]).toEqual(3 / 6)
    expect(value1[1]).toEqual((3 + MAX_TILES * 2) / 6)
    expect(value5[0]).toEqual(6 / 6)
    expect(value5[1]).toEqual((6 + MAX_TILES * 4) / 6)
  })

  it('should return value for Tegor the Vengeful', () => {
    const value1 = getCardValue('N46', 1)
    const value5 = getCardValue('N46', 5)
    const effect1 = (6 + 5 + 4) / 3
    const effect5 = (12 + 10 + 8) / 3
    expect(value1[0]).toEqual(((4 + effect1) / 6) * 1.5)
    expect(value1[1]).toEqual(((4 + effect1) / 6) * 1.5)
    expect(value5[0]).toEqual(((8 + effect5) / 6) * 1.5)
    expect(value5[1]).toEqual(((8 + effect5) / 6) * 1.5)
  })

  it('should return value for Victors of the Melee', () => {
    const value1 = getCardValue('N47', 1)
    const value5 = getCardValue('N47', 5)
    expect(value1[0]).toEqual((4 / 6) * 1)
    expect(value1[1]).toEqual(((4 + 2 * 8) / 6) * 1)
    expect(value5[0]).toEqual((8 / 6) * 1)
    expect(value5[1]).toEqual(((8 + 4 * 8) / 6) * 1)
  })

  it.skip('should return value for Archdruid Earyn', () => {
    const value1 = getCardValue('N48', 1)
    const value5 = getCardValue('N48', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Avian Stalkers', () => {
    const value1 = getCardValue('N49', 1)
    const value5 = getCardValue('N49', 5)
    expect(value1[0]).toEqual((5 / 6) * 0.5)
    expect(value1[1]).toEqual(((5 + 4 * 3) / 6) * 0.5)
    expect(value5[0]).toEqual((10 / 6) * 0.5)
    expect(value5[1]).toEqual(((10 + 4 * 7) / 6) * 0.5)
  })

  it('should return value for Call for Aid', () => {
    const value1 = getCardValue('N50', 1)
    const value5 = getCardValue('N50', 5)
    expect(value1[0]).toEqual(3 / 7)
    expect(value1[1]).toEqual((3 * 4) / 7)
    expect(value5[0]).toEqual(7 / 7)
    expect(value5[1]).toEqual((7 * 4) / 7)
  })

  it('should return value for Dangerous Suitors', () => {
    const value1 = getCardValue('N51', 1)
    const value5 = getCardValue('N51', 5)
    expect(value1[0]).toEqual((5 / 6) * 1)
    expect(value1[1]).toEqual(((5 + MAX_TILES * 2) / 6) * 1)
    expect(value5[0]).toEqual((10 / 6) * 1)
    expect(value5[1]).toEqual(((10 + MAX_TILES * 4) / 6) * 1)
  })

  it('should return value for Salty Outcasts', () => {
    const value1 = getCardValue('N52', 1)
    const value5 = getCardValue('N52', 5)
    expect(value1[0]).toEqual((5 / 7) * 1.5)
    expect(value1[1]).toEqual((5 / 7) * 1.5)
    expect(value5[0]).toEqual((10 / 7) * 1.5)
    expect(value5[1]).toEqual((10 / 7) * 1.5)
  })

  it('should return value for Sharpfist Exiles', () => {
    const value1 = getCardValue('N53', 1)
    const value5 = getCardValue('N53', 5)
    expect(value1[0]).toEqual((2 / 7) * 1)
    expect(value1[1]).toEqual(((2 + MAX_TILES * 2) / 7) * 1)
    expect(value5[0]).toEqual((7 / 7) * 1)
    expect(value5[1]).toEqual(((7 + MAX_TILES * 4) / 7) * 1)
  })

  it('should return value for Veterans of War', () => {
    const value1 = getCardValue('N54', 1)
    const value5 = getCardValue('N54', 5)
    expect(value1[0]).toEqual((8 / 7) * 1)
    expect(value1[1]).toEqual((8 / 7) * 1)
    expect(value5[0]).toEqual((18 / 7) * 1)
    expect(value5[1]).toEqual((18 / 7) * 1)
  })

  it('should return value for Joust Champions', () => {
    const value1 = getCardValue('N55', 1)
    const value5 = getCardValue('N55', 5)
    expect(value1[0]).toEqual((3 / 7) * 1.5)
    expect(value1[1]).toEqual(((3 + 3 * 2) / 7) * 1.5)
    expect(value5[0]).toEqual((7 / 7) * 1.5)
    expect(value5[1]).toEqual(((7 + 7 * 2) / 7) * 1.5)
  })

  it('should return value for Temple Guardians', () => {
    const value1 = getCardValue('N56', 1)
    const value5 = getCardValue('N56', 5)
    expect(value1[0]).toEqual((6 / 8) * 0.5)
    expect(value1[1]).toEqual(((6 + 4 * 3) / 8) * 0.5)
    expect(value5[0]).toEqual((12 / 8) * 0.5)
    expect(value5[1]).toEqual(((12 + 8 * 3) / 8) * 0.5)
  })

  it('should return value for Crazy Bombers', () => {
    const value1 = getCardValue('N57', 1)
    const value5 = getCardValue('N57', 5)
    expect(value1[0]).toEqual((6 / 8) * 1)
    expect(value1[1]).toEqual(((6 + 7) / 8) * 1)
    expect(value5[0]).toEqual((13 / 8) * 1)
    expect(value5[1]).toEqual(((13 + 15) / 8) * 1)
  })

  it('should return value for Siren of the Seas', () => {
    const value1 = getCardValue('N58', 1)
    const value5 = getCardValue('N58', 5)
    expect(value1[0]).toEqual((6 / 9) * 1.75)
    expect(value1[1]).toEqual(((6 + (10 - 3) * 3) / 9) * 1.75)
    expect(value5[0]).toEqual((12 / 9) * 1.75)
    expect(value5[1]).toEqual(((12 + (24 - 3) * 3) / 9) * 1.75)
  })

  it('should return value for Edrik the Fierce', () => {
    const value1 = getCardValue('N59', 1)
    const value5 = getCardValue('N59', 5)
    expect(value1[0]).toEqual((3 / 4) * 0.5)
    expect(value1[1]).toEqual(((3 + 2 * 5) / 4) * 0.5)
    expect(value5[0]).toEqual((7 / 4) * 0.5)
    expect(value5[1]).toEqual(((7 + 6 * 5) / 4) * 0.5)
  })

  it('should return value for Fluffy Badboxers', () => {
    const value1 = getCardValue('N60', 1)
    const value5 = getCardValue('N60', 5)
    expect(value1[0]).toEqual((6 / 5) * 1)
    expect(value1[1]).toEqual((6 / 5) * 1)
    expect(value5[0]).toEqual((12 / 5) * 1)
    expect(value5[1]).toEqual((12 / 5) * 1)
  })

  it('should return value for Hair-Raising Cats', () => {
    const value1 = getCardValue('N61', 1)
    const value5 = getCardValue('N61', 5)
    expect(value1[0]).toEqual((3 / 3) * 0.5)
    expect(value1[1]).toEqual(((3 + 10 * 2) / 3) * 0.5)
    expect(value5[0]).toEqual((7 / 3) * 0.5)
    expect(value5[1]).toEqual(((7 + 24 * 2) / 3) * 0.5)
  })

  it('should return value for Sweetcap Kittens', () => {
    const value1 = getCardValue('N62', 1)
    const value5 = getCardValue('N62', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual((1 / 2) * 0.5)
    expect(value5[0]).toEqual((5 / 2) * 0.5)
    expect(value5[1]).toEqual((5 / 2) * 0.5)
  })

  it('should return value for Unhealthy Hysteria', () => {
    const value1 = getCardValue('N63', 1)
    const value5 = getCardValue('N63', 5)
    expect(value1[0]).toEqual(2 / 3)
    expect(value1[1]).toEqual((4 * 2) / 3)
    expect(value5[0]).toEqual(2 / 3)
    expect(value5[1]).toEqual((8 * 2) / 3)
  })

  it('should return value for Melodious Sisters', () => {
    const value1 = getCardValue('N64', 1)
    const value5 = getCardValue('N64', 5)
    expect(value1[0]).toEqual((4 / 4) * 1)
    expect(value1[1]).toEqual(((4 + 4) / 4) * 1)
    expect(value5[0]).toEqual((8 / 4) * 1)
    expect(value5[1]).toEqual(((8 + 8) / 4) * 1)
  })

  it('should return value for Razor-Sharp Lynxes', () => {
    const value1 = getCardValue('N65', 1)
    const value5 = getCardValue('N65', 5)
    expect(value1[0]).toEqual((2 / 4) * 1)
    expect(value1[1]).toEqual((3 / 4) * 1.25)
    expect(value5[0]).toEqual((6 / 4) * 1)
    expect(value5[1]).toEqual((7 / 4) * 1.25)
  })

  it('should return value for Bigthrust Tigers', () => {
    const value1 = getCardValue('N66', 1)
    const value5 = getCardValue('N66', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual((1 / 2) * 2)
    expect(value5[0]).toEqual((5 / 2) * 0.5)
    expect(value5[1]).toEqual((5 / 2) * 2)
  })

  it('should return value for Wild Saberpaws', () => {
    const value1 = getCardValue('N67', 1)
    const value5 = getCardValue('N67', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual((1 / 2) * 1.5)
    expect(value5[0]).toEqual((5 / 2) * 0.5)
    expect(value5[1]).toEqual((5 / 2) * 1.5)
  })

  it('should return value for Twilight Prowlers', () => {
    const value1 = getCardValue('N68', 1)
    const value5 = getCardValue('N68', 5)
    expect(value1[0]).toEqual((7 / 6) * 0.5)
    expect(value1[1]).toEqual((7 / 6) * 1.75)
    expect(value5[0]).toEqual((15 / 6) * 0.5)
    expect(value5[1]).toEqual((15 / 6) * 1.75)
  })

  it('should return value for Laurus, King in Exile', () => {
    const value1 = getCardValue('N69', 1)
    const value5 = getCardValue('N69', 5)
    expect(value1[0]).toEqual((5 / 5) * 1)
    expect(value1[1]).toEqual(((5 + 4 * 3 * 2) / 5) * 1)
    expect(value5[0]).toEqual((10 / 5) * 1)
    expect(value5[1]).toEqual(((10 + 8 * 3 * 2) / 5) * 1)
  })

  it('should return value for Aged Duskbringers', () => {
    const value1 = getCardValue('N70', 1)
    const value5 = getCardValue('N70', 5)
    expect(value1[0]).toEqual((5 / 7) * 1)
    expect(value1[1]).toEqual(((5 + 4) / 7) * 1)
    expect(value5[0]).toEqual((10 / 7) * 1)
    expect(value5[1]).toEqual(((10 + 9) / 7) * 1)
  })

  it('should return value for Rapid Mousers', () => {
    const value1 = getCardValue('N71', 1)
    const value5 = getCardValue('N71', 5)
    expect(value1[0]).toEqual((1 / 4) * 1.75)
    expect(value1[1]).toEqual((1 / 4) * 1.75)
    expect(value5[0]).toEqual((5 / 4) * 1.75)
    expect(value5[1]).toEqual((5 / 4) * 1.75)
  })

  it('should return value for Seasick Bouncers', () => {
    const value1 = getCardValue('N72', 1)
    const value5 = getCardValue('N72', 5)
    expect(value1[0]).toEqual((8 / 6) * 0.5)
    expect(value1[1]).toEqual((8 / 6) * 0.5)
    expect(value5[0]).toEqual((18 / 6) * 0.5)
    expect(value5[1]).toEqual((18 / 6) * 0.5)
  })

  it('should return value for Trekking Aldermen', () => {
    const value1 = getCardValue('N73', 1)
    const value5 = getCardValue('N73', 5)
    expect(value1[0]).toEqual((3 / 3) * 0.5)
    expect(value1[1]).toEqual(((3 + 3) / 3) * 0.5)
    expect(value5[0]).toEqual((7 / 3) * 0.5)
    expect(value5[1]).toEqual(((7 + 5) / 3) * 0.5)
  })

  it('should return value for Beards of Crowglyph', () => {
    const value1 = getCardValue('N74', 1)
    const value5 = getCardValue('N74', 5)
    expect(value1[0]).toEqual((7 / 6) * 0.5)
    expect(value1[1]).toEqual(((7 + 6 - 1) / 6) * 0.5)
    expect(value5[0]).toEqual((13 / 6) * 0.5)
    expect(value5[1]).toEqual(((13 + 12 - 1) / 6) * 0.5)
  })

  it('should return value for Greenwood Ancients', () => {
    const value1 = getCardValue('N75', 1)
    const value5 = getCardValue('N75', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + MAX_TILES * 2) / 4) * 1)
    expect(value5[0]).toEqual((6 / 4) * 1)
    expect(value5[1]).toEqual(((6 + MAX_TILES * 4) / 4) * 1)
  })

  it('should return value for Prime Oracle Bragda', () => {
    const value1 = getCardValue('N76', 1)
    const value5 = getCardValue('N76', 5)
    expect(value1[0]).toEqual((5 / 6) * 1)
    expect(value1[1]).toEqual(((5 + MAX_TILES * 4) / 6) * 1)
    expect(value5[0]).toEqual((11 / 6) * 1)
    expect(value5[1]).toEqual(((11 + MAX_TILES * 10) / 6) * 1)
  })

  it.skip('should return value for Rogue Sheep', () => {})

  it('should return value for Slyboots', () => {
    const value1 = getCardValue('N78', 1)
    const value5 = getCardValue('N78', 5)
    expect(value1[0]).toEqual((4 / 4) * 1)
    expect(value1[1]).toEqual((4 / 4) * 1)
    expect(value5[0]).toEqual((8 / 4) * 1)
    expect(value5[1]).toEqual((8 / 4) * 1)
  })

  it('should return value for Excited Mouser', () => {
    const value1 = getCardValue('N79', 1)
    const value5 = getCardValue('N79', 5)
    expect(value1[0]).toEqual((5 / 5) * 0.5)
    expect(value1[1]).toEqual((5 / 5) * 0.5)
    expect(value5[0]).toEqual((11 / 5) * 0.5)
    expect(value5[1]).toEqual((11 / 5) * 0.5)
  })

  it('should return value for Flameless Lizards', () => {
    const value1 = getCardValue('N82', 1)
    const value5 = getCardValue('N82', 5)
    expect(value1[0]).toEqual((7 / 5) * 0.5)
    expect(value1[1]).toEqual((7 / 5) * 0.5)
    expect(value5[0]).toEqual((16 / 5) * 0.5)
    expect(value5[1]).toEqual((16 / 5) * 0.5)
  })

  it('should return value for Headless Hotheads', () => {
    const value1 = getCardValue('N83', 1)
    const value5 = getCardValue('N83', 5)
    expect(value1[0]).toEqual((3 / 5) * 1.5)
    expect(value1[1]).toEqual((3 / 5) * 1.5)
    expect(value5[0]).toEqual((7 / 5) * 1.5)
    expect(value5[1]).toEqual((7 / 5) * 1.5)
  })

  it('should return value for Eternal Ethereals', () => {
    const value1 = getCardValue('N84', 1)
    const value5 = getCardValue('N84', 5)
    expect(value1[0]).toEqual((5 / 8) * 1.75)
    expect(value1[1]).toEqual((5 / 8) * 1.75)
    expect(value5[0]).toEqual((11 / 8) * 1.75)
    expect(value5[1]).toEqual((11 / 8) * 1.75)
  })

  it('should return value for Destructobots', () => {
    const value1 = getCardValue('I1', 1)
    const value5 = getCardValue('I1', 5)
    expect(value1[0]).toEqual(((2 - 1) / 2) * 1)
    expect(value1[1]).toEqual((2 / 2) * 1)
    expect(value5[0]).toEqual(((6 - 1) / 2) * 1)
    expect(value5[1]).toEqual((6 / 2) * 1)
  })

  it.skip('should return value for Doctor Mia', () => {
    const value1 = getCardValue('I2', 1)
    const value5 = getCardValue('I2', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Fortification Tonic', () => {
    const value1 = getCardValue('I3', 1)
    const value5 = getCardValue('I3', 5)
    expect(value1[0]).toEqual((2 * 1) / 3)
    expect(value1[1]).toEqual((2 * 8) / 3)
    expect(value5[0]).toEqual((6 * 1) / 3)
    expect(value5[1]).toEqual((6 * 8) / 3)
  })

  it('should return value for Ozone Purifiers', () => {
    const value1 = getCardValue('I4', 1)
    const value5 = getCardValue('I4', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual((1 / 2) * 0.5)
    expect(value5[0]).toEqual((5 / 2) * 0.5)
    expect(value5[1]).toEqual((5 / 2) * 0.5)
  })

  it('should return value for Unstable Build', () => {
    const value1 = getCardValue('I5', 1)
    const value5 = getCardValue('I5', 5)
    expect(value1[0]).toEqual(5 / 2)
    expect(value1[1]).toEqual(5 / 2)
    expect(value5[0]).toEqual(9 / 2)
    expect(value5[1]).toEqual(9 / 2)
  })

  it('should return value for Finite Loopers', () => {
    const value1 = getCardValue('I6', 1)
    const value5 = getCardValue('I6', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + 1) / 4) * 1)
    expect(value5[0]).toEqual((6 / 4) * 1)
    expect(value5[1]).toEqual(((6 + 3) / 4) * 1)
  })

  it('should return value for Greengale Serpents', () => {
    const value1 = getCardValue('I7', 1)
    const value5 = getCardValue('I7', 5)
    expect(value1[0]).toEqual((1 / 3) * 1.5)
    expect(value1[1]).toEqual(((1 + 1 * 2) / 3) * 1.5)
    expect(value5[0]).toEqual((3 / 3) * 1.5)
    expect(value5[1]).toEqual(((3 + 3 * 2) / 3) * 1.5)
  })

  it('should return value for Linked Golems', () => {
    const value1 = getCardValue('I8', 1)
    const value5 = getCardValue('I8', 5)
    expect(value1[0]).toEqual((2 / 3) * 1)
    expect(value1[1]).toEqual(((2 + 1) / 3) * 1)
    expect(value5[0]).toEqual((3 / 3) * 1)
    expect(value5[1]).toEqual(((3 + 4) / 3) * 1)
  })

  it('should return value for Sound Drivers', () => {
    const value1 = getCardValue('I9', 1)
    const value5 = getCardValue('I9', 5)
    expect(value1[0]).toEqual((3 / 3) * 0.5)
    expect(value1[1]).toEqual((3 / 3) * 2)
    expect(value5[0]).toEqual((7 / 3) * 0.5)
    expect(value5[1]).toEqual((7 / 3) * 2)
  })

  it('should return value for Upgrade Point', () => {
    const value1 = getCardValue('I10', 1)
    const value5 = getCardValue('I10', 5)
    expect(value1[0]).toEqual(4 / 3)
    expect(value1[1]).toEqual((4 + 2 * 8) / 3)
    expect(value5[0]).toEqual(8 / 3)
    expect(value5[1]).toEqual((8 + 5 * 8) / 3)
  })

  it('should return value for Boosting Elixir', () => {
    const value1 = getCardValue('I11', 1)
    const value5 = getCardValue('I11', 5)
    expect(value1[0]).toEqual(3 / 4)
    expect(value1[1]).toEqual((3 + 3) / 4)
    expect(value5[0]).toEqual(6 / 4)
    expect(value5[1]).toEqual((6 + 6) / 4)
  })

  it('should return value for Chaotic Pupil', () => {
    const value1 = getCardValue('I12', 1)
    const value5 = getCardValue('I12', 5)
    expect(value1[0]).toEqual((1 / 5) * 1.5)
    expect(value1[1]).toEqual(((1 + 3) / 5) * 1.5)
    expect(value5[0]).toEqual((1 / 5) * 1.5)
    expect(value5[1]).toEqual(((1 + 7) / 5) * 1.5)
  })

  it('should return value for Embers of Chaos', () => {
    const value1 = getCardValue('I13', 1)
    const value5 = getCardValue('I13', 5)
    expect(value1[0]).toEqual((1 / 4) * 1)
    expect(value1[1]).toEqual(((1 + 6) / 4) * 1)
    expect(value5[0]).toEqual((1 / 4) * 1)
    expect(value5[1]).toEqual(((1 + 12) / 4) * 1)
  })

  it('should return value for Mech Workshop', () => {
    const value1 = getCardValue('I14', 1)
    const value5 = getCardValue('I14', 5)
    expect(value1[0]).toEqual(3 / 4)
    expect(value1[1]).toEqual((3 + 2) / 4)
    expect(value5[0]).toEqual(6 / 4)
    expect(value5[1]).toEqual((6 + 6) / 4)
  })

  it('should return value for Overchargers', () => {
    const value1 = getCardValue('I15', 1)
    const value5 = getCardValue('I15', 5)
    expect(value1[0]).toEqual(((2 + 1) / 4) * 1)
    expect(value1[1]).toEqual(((2 + 1) / 4) * 1)
    expect(value5[0]).toEqual(((5 + 3) / 4) * 1)
    expect(value5[1]).toEqual(((5 + 3) / 4) * 1)
  })

  it('should return value for Debug Loggers', () => {
    const value1 = getCardValue('I16', 1)
    const value5 = getCardValue('I16', 5)
    expect(value1[0]).toEqual((4 / 5) * 1)
    expect(value1[1]).toEqual(((4 + 2 * 2) / 5) * 1)
    expect(value5[0]).toEqual((8 / 5) * 1)
    expect(value5[1]).toEqual(((8 + 5 * 2) / 5) * 1)
  })

  it('should return value for Eloth the Ignited', () => {
    const value1 = getCardValue('I17', 1)
    const value5 = getCardValue('I17', 5)
    expect(value1[0]).toEqual((5 / 5) * 2)
    expect(value1[1]).toEqual(((5 + 3) / 5) * 2)
    expect(value5[0]).toEqual((10 / 5) * 2)
    expect(value5[1]).toEqual(((10 + 7) / 5) * 2)
  })

  it('should return value for Flaming Stream', () => {
    const value1 = getCardValue('I18', 1)
    const value5 = getCardValue('I18', 5)
    expect(value1[0]).toEqual((4 * 1) / 5)
    expect(value1[1]).toEqual((4 * 5) / 5)
    expect(value5[0]).toEqual((8 * 1) / 5)
    expect(value5[1]).toEqual((8 * 5) / 5)
  })

  it('should return value for Siege Assembly', () => {
    const value1 = getCardValue('I19', 1)
    const value5 = getCardValue('I19', 5)
    expect(value1[0]).toEqual((3 + 3) / 5)
    expect(value1[1]).toEqual((3 + 3) / 5)
    expect(value5[0]).toEqual((6 + 6) / 5)
    expect(value5[1]).toEqual((6 + 6) / 5)
  })

  it('should return value for Windmakers', () => {
    const value1 = getCardValue('I20', 1)
    const value5 = getCardValue('I20', 5)
    expect(value1[0]).toEqual((2 / 4) * 1.5)
    expect(value1[1]).toEqual(((2 + 3 * 2) / 4) * 1.5)
    expect(value5[0]).toEqual((2 / 4) * 1.5)
    expect(value5[1]).toEqual(((2 + 7 * 2) / 4) * 1.5)
  })

  it('should return value for Delegators', () => {
    const value1 = getCardValue('I21', 1)
    const value5 = getCardValue('I21', 5)
    expect(value1[0]).toEqual((7 / 6) * 1)
    expect(value1[1]).toEqual((7 / 6) * 1)
    expect(value5[0]).toEqual((15 / 6) * 1)
    expect(value5[1]).toEqual((15 / 6) * 1)
  })

  it('should return value for Project PH03-NIX', () => {
    const value1 = getCardValue('I22', 1)
    const value5 = getCardValue('I22', 5)
    expect(value1[0]).toEqual((4 / 5) * 1)
    expect(value1[1]).toEqual(((4 + 5) / 5) * 1)
    expect(value5[0]).toEqual((8 / 5) * 1)
    expect(value5[1]).toEqual(((8 + 10) / 5) * 1)
  })

  it('should return value for Armed Schemers', () => {
    const value1 = getCardValue('I23', 1)
    const value5 = getCardValue('I23', 5)
    expect(value1[0]).toEqual((6 / 6) * 0.5)
    expect(value1[1]).toEqual(((6 + 3 * 4) / 6) * 0.5)
    expect(value5[0]).toEqual((12 / 6) * 0.5)
    expect(value5[1]).toEqual(((12 + 7 * 4) / 6) * 0.5)
  })

  it('should return value for Mechanical Workers', () => {
    const value1 = getCardValue('I24', 1)
    const value5 = getCardValue('I24', 5)
    expect(value1[0]).toEqual((5 / 6) * 1)
    expect(value1[1]).toEqual(((5 + 3 + 2) / 6) * 1)
    expect(value5[0]).toEqual((9 / 6) * 1)
    expect(value5[1]).toEqual(((9 + 6 + 6) / 6) * 1)
  })

  it('should return value for Agents in Charge', () => {
    const value1 = getCardValue('I25', 1)
    const value5 = getCardValue('I25', 5)
    expect(value1[0]).toEqual((3 / 5) * 1.75)
    expect(value1[1]).toEqual((3 / 5) * 1.75)
    expect(value5[0]).toEqual((7 / 5) * 1.75)
    expect(value5[1]).toEqual((7 / 5) * 1.75)
  })

  it('should return value for Operators', () => {
    const value1 = getCardValue('I26', 1)
    const value5 = getCardValue('I26', 5)
    expect(value1[0]).toEqual((10 / 8) * 1)
    expect(value1[1]).toEqual((10 / 8) * 1)
    expect(value5[0]).toEqual((24 / 8) * 1)
    expect(value5[1]).toEqual((24 / 8) * 1)
  })

  it('should return value for Scrapped Planners', () => {
    const value1 = getCardValue('I27', 1)
    const value5 = getCardValue('I27', 5)
    expect(value1[0]).toEqual((4 / 4) * 1)
    expect(value1[1]).toEqual(((4 + 1) / 4) * 1)
    expect(value5[0]).toEqual((8 / 4) * 1)
    expect(value5[1]).toEqual(((8 + 5) / 4) * 1)
  })

  it('should return value for Booming Professors', () => {
    const value1 = getCardValue('I28', 1)
    const value5 = getCardValue('I28', 5)
    expect(value1[0]).toEqual((5 / 6) * 0.5)
    expect(value1[1]).toEqual(((5 + 3) / 6) * 0.5)
    expect(value5[0]).toEqual((10 / 6) * 0.5)
    expect(value5[1]).toEqual(((10 + 6) / 6) * 0.5)
  })

  it('should return value for Brood Sages', () => {
    const value1 = getCardValue('F1', 1)
    const value5 = getCardValue('F1', 5)
    expect(value1[0]).toEqual((2 / 2) * 0.5)
    expect(value1[1]).toEqual(((2 + 10 * 1) / 2) * 1)
    expect(value5[0]).toEqual((5 / 2) * 0.5)
    expect(value5[1]).toEqual(((5 + 10 * 1) / 2) * 1)
  })

  it('should return value for Copperskin Ranger', () => {
    const value1 = getCardValue('F2', 1)
    const value5 = getCardValue('F2', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual((1 / 2) * 0.5)
    expect(value5[0]).toEqual((3 / 2) * 0.5)
    expect(value5[1]).toEqual((3 / 2) * 0.5)
  })

  it('should return value for Dubious Hags', () => {
    const value1 = getCardValue('F3', 1)
    const value5 = getCardValue('F3', 5)
    expect(value1[0]).toEqual(((2 - 1) / 2) * 1)
    expect(value1[1]).toEqual((2 / 2) * 1)
    expect(value5[0]).toEqual(((6 - 1) / 2) * 1)
    expect(value5[1]).toEqual((6 / 2) * 1)
  })

  it('should return value for Toxic Sacrifice', () => {
    const value1 = getCardValue('F4', 1)
    const value5 = getCardValue('F4', 5)
    expect(value1[0]).toEqual((1 - 10) / 2)
    expect(value1[1]).toEqual((8 * 2 - 1) / 2)
    expect(value5[0]).toEqual((1 - 24) / 2)
    expect(value5[1]).toEqual((8 * 6 - 1) / 2)
  })

  it('should return value for Crimson Sentry', () => {
    const value1 = getCardValue('F5', 1)
    const value5 = getCardValue('F5', 5)
    expect(value1[0]).toEqual((1 / 3) * 1.5)
    expect(value1[1]).toEqual(((1 + 4 * 1) / 3) * 1.5)
    expect(value5[0]).toEqual((1 / 3) * 1.5)
    expect(value5[1]).toEqual(((1 + 4 * 5) / 3) * 1.5)
  })

  it('should return value for Harpies of the Hunt', () => {
    const value1 = getCardValue('F6', 1)
    const value5 = getCardValue('F6', 5)
    expect(value1[0]).toEqual((4 / 3) * 0.5)
    expect(value1[1]).toEqual((4 / 3) * 0.5)
    expect(value5[0]).toEqual((8 / 3) * 0.5)
    expect(value5[1]).toEqual((8 / 3) * 0.5)
  })

  it('should return value for Heliotroopers', () => {
    const value1 = getCardValue('F7', 1)
    const value5 = getCardValue('F7', 5)
    expect(value1[0]).toEqual((3 / 3) * 1)
    expect(value1[1]).toEqual((3 / 3) * 1)
    expect(value5[0]).toEqual((7 / 3) * 1)
    expect(value5[1]).toEqual((7 / 3) * 1)
  })

  it('should return value for Rain of Frogs', () => {
    const value1 = getCardValue('F8', 1)
    const value5 = getCardValue('F8', 5)
    expect(value1[0]).toEqual((3 * 1) / 2)
    expect(value1[1]).toEqual((3 * 1) / 2)
    expect(value5[0]).toEqual((6 * 1) / 2)
    expect(value5[1]).toEqual((6 * 1) / 2)
  })

  it('should return value for Wandering Wyrms', () => {
    const value1 = getCardValue('F9', 1)
    const value5 = getCardValue('F9', 5)
    expect(value1[0]).toEqual((3 / 3) * 0.5)
    expect(value1[1]).toEqual(((3 + 3) / 3) * 0.5)
    expect(value5[0]).toEqual((3 / 3) * 0.5)
    expect(value5[1]).toEqual(((3 + 7) / 3) * 0.5)
  })

  it('should return value for Azure Hatcher', () => {
    const value1 = getCardValue('F10', 1)
    const value5 = getCardValue('F10', 5)
    expect(value1[0]).toEqual((1 / 4) * 1.5)
    expect(value1[1]).toEqual(((1 + 2 * 1) / 4) * 1.5)
    expect(value5[0]).toEqual((1 / 4) * 1.5)
    expect(value5[1]).toEqual(((1 + 6 * 1) / 4) * 1.5)
  })

  it('should return value for Marked as Prey', () => {
    const value1 = getCardValue('F11', 1)
    const value5 = getCardValue('F11', 5)
    expect(value1[0]).toEqual(1 / 4)
    expect(value1[1]).toEqual((5 * 2) / 4)
    expect(value5[0]).toEqual(1 / 4)
    expect(value5[1]).toEqual((10 * 2) / 4)
  })

  it('should return value for Tode the Elevated', () => {
    const value1 = getCardValue('F12', 1)
    const value5 = getCardValue('F12', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + 2) / 4) * 1)
    expect(value5[0]).toEqual((7 / 4) * 1)
    expect(value5[1]).toEqual(((7 + 6) / 4) * 1)
  })

  it('should return value for Venomfall Spire', () => {
    const value1 = getCardValue('F13', 1)
    const value5 = getCardValue('F13', 5)
    expect(value1[0]).toEqual(4 / 4)
    expect(value1[1]).toEqual(4 / 4)
    expect(value5[0]).toEqual(8 / 4)
    expect(value5[1]).toEqual(8 / 4)
  })

  it('should return value for Witches of the Wild', () => {
    const value1 = getCardValue('F14', 1)
    const value5 = getCardValue('F14', 5)
    expect(value1[0]).toEqual((2 / 4) * 1)
    expect(value1[1]).toEqual(((2 + 1 * 4 * 2) / 4) * 1)
    expect(value5[0]).toEqual((5 / 4) * 1)
    expect(value5[1]).toEqual(((5 + 3 * 4 * 2) / 4) * 1)
  })

  it('should return value for Amberhides', () => {
    const value1 = getCardValue('F15', 1)
    const value5 = getCardValue('F15', 5)
    expect(value1[0]).toEqual((4 / 5) * 1)
    expect(value1[1]).toEqual(((4 + 4 * 2) / 5) * 1)
    expect(value5[0]).toEqual((8 / 5) * 1)
    expect(value5[1]).toEqual(((8 + 8 * 2) / 5) * 1)
  })

  it('should return value for Feral Shamans', () => {
    const value1 = getCardValue('F16', 1)
    const value5 = getCardValue('F16', 5)
    expect(value1[0]).toEqual((1 / 5) * 1)
    expect(value1[1]).toEqual(((1 + 3 * 2) / 5) * 1)
    expect(value5[0]).toEqual((3 / 5) * 1)
    expect(value5[1]).toEqual(((3 + 6 * 2) / 5) * 1)
  })

  it('should return value for Obsidian Butchers', () => {
    const value1 = getCardValue('F17', 1)
    const value5 = getCardValue('F17', 5)
    expect(value1[0]).toEqual((2 / 5) * 1.5)
    expect(value1[1]).toEqual(((2 + 2 * 10) / 5) * 1.5)
    expect(value5[0]).toEqual((6 / 5) * 1.5)
    expect(value5[1]).toEqual(((6 + 2 * 10) / 5) * 1.5)
  })

  it('should return value for Soulcrushers', () => {
    const value1 = getCardValue('F18', 1)
    const value5 = getCardValue('F18', 5)
    expect(value1[0]).toEqual((5 / 5) * 1)
    expect(value1[1]).toEqual(((5 * 2 - 1) / 5) * 1)
    expect(value5[0]).toEqual((10 / 5) * 1)
    expect(value5[1]).toEqual(((10 * 2 - 1) / 5) * 1)
  })

  it('should return value for Sunbeam Serpents', () => {
    const value1 = getCardValue('F19', 1)
    const value5 = getCardValue('F19', 5)
    expect(value1[0]).toEqual((2 / 5) * 1)
    expect(value1[1]).toEqual(((2 + 10) / 5) * 1)
    expect(value5[0]).toEqual((6 / 5) * 1)
    expect(value5[1]).toEqual(((6 + 24) / 5) * 1)
  })

  it('should return value for Blood Ministers', () => {
    const value1 = getCardValue('F20', 1)
    const value5 = getCardValue('F20', 5)
    expect(value1[0]).toEqual((5 / 6) * 0.5)
    expect(value1[1]).toEqual(((5 + 4 * 3 * 2) / 6) * 0.5)
    expect(value5[0]).toEqual((10 / 6) * 0.5)
    expect(value5[1]).toEqual(((10 + 4 * 7 * 2) / 6) * 0.5)
  })

  it('should return value for Broodmother Qordia', () => {
    const value1 = getCardValue('F21', 1)
    const value5 = getCardValue('F21', 5)
    expect(value1[0]).toEqual((5 / 6) * 1)
    expect(value1[1]).toEqual(((5 + 3 * 3) / 6) * 1)
    expect(value5[0]).toEqual((10 / 6) * 1)
    expect(value5[1]).toEqual(((10 + 3 * 7) / 6) * 1)
  })

  it('should return value for Curse of Strings', () => {
    const value1 = getCardValue('F22', 1)
    const value5 = getCardValue('F22', 5)
    expect(value1[0]).toEqual((1 * 2) / 6)
    expect(value1[1]).toEqual((7 * 2) / 6)
    expect(value5[0]).toEqual((1 * 2) / 6)
    expect(value5[1]).toEqual((17 * 2) / 6)
  })

  it('should return value for High Priestess Klaxi', () => {
    const value1 = getCardValue('F23', 1)
    const value5 = getCardValue('F23', 5)
    expect(value1[0]).toEqual((5 / 8) * 0.5)
    expect(value1[1]).toEqual(((5 + 19 * 5 * 2) / 8) * 0.5)
    expect(value5[0]).toEqual((10 / 8) * 0.5)
    expect(value5[1]).toEqual(((10 + 19 * 10 * 2) / 8) * 0.5)
  })

  it('should return value for Clerics with Cords', () => {
    const value1 = getCardValue('F24', 1)
    const value5 = getCardValue('F24', 5)
    expect(value1[0]).toEqual((3 / 4) * 0.5)
    expect(value1[1]).toEqual(((3 + 2 * 2) / 4) * 0.5)
    expect(value5[0]).toEqual((7 / 4) * 0.5)
    expect(value5[1]).toEqual(((7 + 6 * 2) / 4) * 0.5)
  })

  it('should return value for Limelimbs', () => {
    const value1 = getCardValue('F25', 1)
    const value5 = getCardValue('F25', 5)
    expect(value1[0]).toEqual((1 / 3) * 1.5)
    expect(value1[1]).toEqual((1 / 3) * 1.5)
    expect(value5[0]).toEqual((5 / 3) * 1.5)
    expect(value5[1]).toEqual((5 / 3) * 1.5)
  })

  it('should return value for Untamed Cultists', () => {
    const value1 = getCardValue('F26', 1)
    const value5 = getCardValue('F26', 5)
    expect(value1[0]).toEqual((10 / 7) * 0.5)
    expect(value1[1]).toEqual((10 / 7) * 0.5)
    expect(value5[0]).toEqual((24 / 7) * 0.5)
    expect(value5[1]).toEqual((24 / 7) * 0.5)
  })

  it('should return value for Faithless Prophets', () => {
    const value1 = getCardValue('F27', 1)
    const value5 = getCardValue('F27', 5)
    expect(value1[0]).toEqual(((1 - 4 * 2) / 3) * 1)
    expect(value1[1]).toEqual((5 / 3) * 1)
    expect(value5[0]).toEqual(((1 - 9 * 2) / 3) * 1)
    expect(value5[1]).toEqual((10 / 3) * 1)
  })

  it('should return value for Hairy Chestnuts', () => {
    const value1 = getCardValue('F28', 1)
    const value5 = getCardValue('F28', 5)
    expect(value1[0]).toEqual((5 / 6) * 0.5)
    expect(value1[1]).toEqual(((5 + 2 * 1) / 6) * 0.5)
    expect(value5[0]).toEqual((12 / 6) * 0.5)
    expect(value5[1]).toEqual(((12 + 2 * 2) / 6) * 0.5)
  })

  it('should return value for Doppelbocks', () => {
    const value1 = getCardValue('S1', 1)
    const value5 = getCardValue('S1', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual(((1 + 1) / 2) * 1)
    expect(value5[0]).toEqual((3 / 2) * 0.5)
    expect(value5[1]).toEqual(((3 + 3) / 2) * 1)
  })

  it('should return value for Restless Goats', () => {
    const value1 = getCardValue('S2', 1)
    const value5 = getCardValue('S2', 5)
    expect(value1[0]).toEqual(((1 - 2) / 2) * 1.5)
    expect(value1[1]).toEqual(((1 - 2) / 2) * 1.5)
    expect(value5[0]).toEqual(((5 - 2) / 2) * 1.5)
    expect(value5[1]).toEqual(((5 - 2) / 2) * 1.5)
  })

  it('should return value for Counselor Ahmi', () => {
    const value1 = getCardValue('S3', 1)
    const value5 = getCardValue('S3', 5)
    expect(value1[0]).toEqual((1 / 3) * 1)
    expect(value1[1]).toEqual((1 / 3) * 1)
    expect(value5[0]).toEqual((5 / 3) * 1)
    expect(value5[1]).toEqual((5 / 3) * 1)
  })

  it('should return value for Dreadful Keepers', () => {
    const value1 = getCardValue('S4', 1)
    const value5 = getCardValue('S4', 5)
    expect(value1[0]).toEqual((3 / 3) * 0.5)
    expect(value1[1]).toEqual(((3 + 3) / 3) * 0.5)
    expect(value5[0]).toEqual((7 / 3) * 0.5)
    expect(value5[1]).toEqual(((7 + 8) / 3) * 0.5)
  })

  it('should return value for Faun Companions', () => {
    const value1 = getCardValue('S5', 1)
    const value5 = getCardValue('S5', 5)
    expect(value1[0]).toEqual((1 / 3) * 1)
    expect(value1[1]).toEqual(((1 + 3) / 3) * 1)
    expect(value5[0]).toEqual((3 / 3) * 1)
    expect(value5[1]).toEqual(((3 + 6) / 3) * 1)
  })

  it.skip('should return value for Forgotten Souls', () => {
    const value1 = getCardValue('S6', 1)
    const value5 = getCardValue('S6', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Moonlit Aerie', () => {
    const value1 = getCardValue('S7', 1)
    const value5 = getCardValue('S7', 5)
    expect(value1[0]).toEqual(3 / 3)
    expect(value1[1]).toEqual((3 + MAX_TILES * 1) / 3)
    expect(value5[0]).toEqual(6 / 3)
    expect(value5[1]).toEqual((6 + MAX_TILES * 3) / 3)
  })

  it('should return value for Shady Ghoul', () => {
    const value1 = getCardValue('S8', 1)
    const value5 = getCardValue('S8', 5)
    expect(value1[0]).toEqual((1 / 3) * 1.5)
    expect(value1[1]).toEqual(((1 + 1) / 3) * 1.5)
    expect(value5[0]).toEqual((1 / 3) * 1.5)
    expect(value5[1]).toEqual(((1 + 5) / 3) * 1.5)
  })

  it('should return value for Swarmcallers', () => {
    const value1 = getCardValue('S9', 1)
    const value5 = getCardValue('S9', 5)
    expect(value1[0]).toEqual((1 / 3) * 1)
    expect(value1[1]).toEqual(((1 + 2 * 4) / 3) * 1)
    expect(value5[0]).toEqual((3 / 3) * 1)
    expect(value5[1]).toEqual(((3 + 4 * 4) / 3) * 1)
  })

  it('should return value for Broken Truce', () => {
    const value1 = getCardValue('S10', 1)
    const value5 = getCardValue('S10', 5)
    expect(value1[0]).toEqual((1 - 3) / 4)
    expect(value1[1]).toEqual((8 - 3) / 4)
    expect(value5[0]).toEqual((1 - 3) / 4)
    expect(value5[1]).toEqual((18 - 3) / 4)
  })

  it('should return value for Devastators', () => {
    const value1 = getCardValue('S11', 1)
    const value5 = getCardValue('S11', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + 3) / 4) * 1)
    expect(value5[0]).toEqual((6 / 4) * 1)
    expect(value5[1]).toEqual(((6 + 6) / 4) * 1)
  })

  it('should return value for Draconic Roamers', () => {
    const value1 = getCardValue('S12', 1)
    const value5 = getCardValue('S12', 5)
    expect(value1[0]).toEqual((2 / 4) * 1.5)
    expect(value1[1]).toEqual(((2 + 1 * 2) / 4) * 1.5)
    expect(value5[0]).toEqual((4 / 4) * 1.5)
    expect(value5[1]).toEqual(((4 + 3 * 2) / 4) * 1.5)
  })

  it('should return value for Mischiefs', () => {
    const value1 = getCardValue('S13', 1)
    const value5 = getCardValue('S13', 5)
    expect(value1[0]).toEqual(((2 + 1) / 4) * 1)
    expect(value1[1]).toEqual(((2 + 1) / 4) * 1)
    expect(value5[0]).toEqual(((5 + 2) / 4) * 1)
    expect(value5[1]).toEqual(((5 + 2) / 4) * 1)
  })

  it('should return value for Pan Heralds', () => {
    const value1 = getCardValue('S14', 1)
    const value5 = getCardValue('S14', 5)
    expect(value1[0]).toEqual((3 / 4) * 0.5)
    expect(value1[1]).toEqual(((3 + 1 * 8) / 4) * 0.5)
    expect(value5[0]).toEqual((6 / 4) * 0.5)
    expect(value5[1]).toEqual(((6 + 3 * 8) / 4) * 0.5)
  })

  it('should return value for Dark Harvest', () => {
    const value1 = getCardValue('S15', 1)
    const value5 = getCardValue('S15', 5)
    expect(value1[0]).toEqual(2 / 5)
    expect(value1[1]).toEqual((2 * MAX_TILES) / 5)
    expect(value5[0]).toEqual(6 / 5)
    expect(value5[1]).toEqual((6 * MAX_TILES) / 5)
  })

  it('should return value for Dreadfauns', () => {
    const value1 = getCardValue('S16', 1)
    const value5 = getCardValue('S16', 5)
    expect(value1[0]).toEqual((3 / 5) * 0.5)
    expect(value1[1]).toEqual(((3 + 2 * 2) / 5) * 1)
    expect(value5[0]).toEqual((6 / 5) * 0.5)
    expect(value5[1]).toEqual(((6 + 2 * 4) / 5) * 1)
  })

  it('should return value for Grim Couriers', () => {
    const value1 = getCardValue('S17', 1)
    const value5 = getCardValue('S17', 5)
    expect(value1[0]).toEqual((3 / 5) * 1.75)
    expect(value1[1]).toEqual((3 / 5) * 1.75)
    expect(value5[0]).toEqual((7 / 5) * 1.75)
    expect(value5[1]).toEqual((7 / 5) * 1.75)
  })

  it('should return value for Pillars of Doom', () => {
    const value1 = getCardValue('S18', 1)
    const value5 = getCardValue('S18', 5)
    expect(value1[0]).toEqual(4 / 5)
    expect(value1[1]).toEqual((4 + 2) / 5)
    expect(value5[0]).toEqual(8 / 5)
    expect(value5[1]).toEqual((8 + 4) / 5)
  })

  it('should return value for Xuri, Lord of Life', () => {
    const value1 = getCardValue('S19', 1)
    const value5 = getCardValue('S19', 5)
    expect(value1[0]).toEqual((3 / 5) * 0.5)
    expect(value1[1]).toEqual(((3 + 3 * 3) / 5) * 2)
    expect(value5[0]).toEqual((7 / 5) * 0.5)
    expect(value5[1]).toEqual(((7 + 3 * 7) / 5) * 2)
  })

  it.skip('should return value for Herald’s Hymn', () => {
    const value1 = getCardValue('S20', 1)
    const value5 = getCardValue('S20', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Queen of Herds', () => {
    const value1 = getCardValue('S21', 1)
    const value5 = getCardValue('S21', 5)
    expect(value1[0]).toEqual((8 / 7) * 0.5)
    expect(value1[1]).toEqual(((8 + 3 + 8 * 1) / 7) * 0.5)
    expect(value5[0]).toEqual((14 / 7) * 0.5)
    expect(value5[1]).toEqual(((14 + (6 + 4 + 4) + 6 + 8 * 3) / 7) * 0.5)
  })

  it('should return value for Vindicators', () => {
    const value1 = getCardValue('S22', 1)
    const value5 = getCardValue('S22', 5)
    expect(value1[0]).toEqual((3 / 6) * 1.75)
    expect(value1[1]).toEqual(((3 + 1 * 3) / 6) * 1.75)
    expect(value5[0]).toEqual((6 / 6) * 1.75)
    expect(value5[1]).toEqual(((6 + 2 * 3) / 6) * 1.75)
  })

  it('should return value for Lasting Remains', () => {
    const value1 = getCardValue('S23', 1)
    const value5 = getCardValue('S23', 5)
    expect(value1[0]).toEqual((8 / 7) * 1)
    expect(value1[1]).toEqual((8 / 7) * 2)
    expect(value5[0]).toEqual((15 / 7) * 1)
    expect(value5[1]).toEqual((15 / 7) * 2)
  })

  it('should return value for Head Start', () => {
    const value1 = getCardValue('S24', 1)
    const value5 = getCardValue('S24', 5)
    expect(value1[0]).toEqual((3 / 2) * 0.5)
    expect(value1[1]).toEqual((3 / 2) * 0.5)
    expect(value5[0]).toEqual((7 / 2) * 0.5)
    expect(value5[1]).toEqual((7 / 2) * 0.5)
  })

  it('should return value for Mindless Horde', () => {
    const value1 = getCardValue('S25', 1)
    const value5 = getCardValue('S25', 5)
    expect(value1[0]).toEqual((4 / 3) * 0.5)
    expect(value1[1]).toEqual((4 / 3) * 0.5)
    expect(value5[0]).toEqual((8 / 3) * 0.5)
    expect(value5[1]).toEqual((8 / 3) * 0.5)
  })

  it('should return value for Obliterators', () => {
    const value1 = getCardValue('S26', 1)
    const value5 = getCardValue('S26', 5)
    expect(value1[0]).toEqual((4 / 6) * 1.5)
    expect(value1[1]).toEqual((4 / 6) * 1.5)
    expect(value5[0]).toEqual((8 / 6) * 1.5)
    expect(value5[1]).toEqual((8 / 6) * 1.5)
  })

  it.skip('should return value for Petrified Fossils', () => {
    const value1 = getCardValue('S27', 1)
    const value5 = getCardValue('S27', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Bucks of Wasteland', () => {
    const value1 = getCardValue('S28', 1)
    const value5 = getCardValue('S28', 5)
    expect(value1[0]).toEqual((6 / 6) * 0.5)
    expect(value1[1]).toEqual(((6 + 5 * 2) / 6) * 0.5)
    expect(value5[0]).toEqual((14 / 6) * 0.5)
    expect(value5[1]).toEqual(((14 + 13 * 2) / 6) * 0.5)
  })

  it('should return value for Icicle Burst', () => {
    const value1 = getCardValue('W1', 1)
    const value5 = getCardValue('W1', 5)
    expect(value1[0]).toEqual(1 / 1)
    expect(value1[1]).toEqual(8 / 1)
    expect(value5[0]).toEqual(1 / 1)
    expect(value5[1]).toEqual(18 / 1)
  })

  it('should return value for Frosthexers', () => {
    const value1 = getCardValue('W2', 1)
    const value5 = getCardValue('W2', 5)
    expect(value1[0]).toEqual((1 / 2) * 0.5)
    expect(value1[1]).toEqual((1 / 2) * 0.5)
    expect(value5[0]).toEqual((5 / 2) * 0.5)
    expect(value5[1]).toEqual((5 / 2) * 0.5)
  })

  it('should return value for The Hearth', () => {
    const value1 = getCardValue('W3', 1)
    const value5 = getCardValue('W3', 5)
    expect(value1[0]).toEqual(3 / 3)
    expect(value1[1]).toEqual((3 + 2) / 3)
    expect(value5[0]).toEqual(6 / 3)
    expect(value5[1]).toEqual((6 + 4) / 3)
  })

  it('should return value for Wisp Cloud', () => {
    const value1 = getCardValue('W4', 1)
    const value5 = getCardValue('W4', 5)
    expect(value1[0]).toEqual((1 / 3) * 1)
    expect(value1[1]).toEqual(((1 + 4 * 8) / 3) * 1)
    expect(value5[0]).toEqual((5 / 3) * 1)
    expect(value5[1]).toEqual(((5 + 8 * 8) / 3) * 1)
  })

  it('should return value for Yowling Weavers', () => {
    const value1 = getCardValue('W5', 1)
    const value5 = getCardValue('W5', 5)
    expect(value1[0]).toEqual((4 / 3) * 1)
    expect(value1[1]).toEqual((4 / 3) * 1)
    expect(value5[0]).toEqual((8 / 3) * 1)
    expect(value5[1]).toEqual((8 / 3) * 1)
  })

  it('should return value for Moment’s Peace', () => {
    const value1 = getCardValue('W6', 1)
    const value5 = getCardValue('W6', 5)
    expect(value1[0]).toEqual(4 / 5)
    expect(value1[1]).toEqual(4 / 5)
    expect(value5[0]).toEqual(8 / 5)
    expect(value5[1]).toEqual(8 / 5)
  })

  it('should return value for Mystwives', () => {
    const value1 = getCardValue('W7', 1)
    const value5 = getCardValue('W7', 5)
    expect(value1[0]).toEqual((3 / 4) * 1)
    expect(value1[1]).toEqual(((3 + 4) / 4) * 1)
    expect(value5[0]).toEqual((3 / 4) * 1)
    expect(value5[1]).toEqual(((3 + 8) / 4) * 1)
  })

  it.skip('should return value for Spellbinder Zhevana', () => {
    const value1 = getCardValue('W8', 1)
    const value5 = getCardValue('W8', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it.skip('should return value for Frozen Core', () => {
    const value1 = getCardValue('W9', 1)
    const value5 = getCardValue('W9', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Lady Rime', () => {
    const value1 = getCardValue('W10', 1)
    const value5 = getCardValue('W10', 5)
    expect(value1[0]).toEqual((5 / 6) * 1)
    expect(value1[1]).toEqual(((5 + 2 * (MAX_MANA - 6)) / MAX_MANA) * 1)
    expect(value5[0]).toEqual((10 / 6) * 1)
    expect(value5[1]).toEqual(((10 + 5 * (MAX_MANA - 6)) / MAX_MANA) * 1)
  })

  it.skip('should return value for Midwinter Chaos', () => {
    const value1 = getCardValue('W11', 1)
    const value5 = getCardValue('W11', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Rimelings', () => {
    const value1 = getCardValue('W12', 1)
    const value5 = getCardValue('W12', 5)
    expect(value1[0]).toEqual((2 / 2) * 1)
    expect(value1[1]).toEqual((2 / 2) * 1)
    expect(value5[0]).toEqual((6 / 2) * 1)
    expect(value5[1]).toEqual((6 / 2) * 1)
  })

  it('should return value for Rockworkers', () => {
    const value1 = getCardValue('W13', 1)
    const value5 = getCardValue('W13', 5)
    expect(value1[0]).toEqual((4 / 5) * 0.5)
    expect(value1[1]).toEqual(((4 + 4) / 5) * 1)
    expect(value5[0]).toEqual((8 / 5) * 0.5)
    expect(value5[1]).toEqual(((8 + 8) / 5) * 1)
  })

  it('should return value for Blessed with Brawn', () => {
    const value1 = getCardValue('W14', 1)
    const value5 = getCardValue('W14', 5)
    expect(value1[0]).toEqual(8 / 6)
    expect(value1[1]).toEqual(8 / 6)
    expect(value5[0]).toEqual(18 / 6)
    expect(value5[1]).toEqual(18 / 6)
  })

  it('should return value for Broken Earth Drakes', () => {
    const value1 = getCardValue('W15', 1)
    const value5 = getCardValue('W15', 5)
    expect(value1[0]).toEqual(((2 - 3 * 18) / 6) * 1)
    expect(value1[1]).toEqual(((2 + 3 * 18) / 6) * 1)
    expect(value5[0]).toEqual(((2 - 7 * 18) / 6) * 1)
    expect(value5[1]).toEqual(((2 + 7 * 18) / 6) * 1)
  })

  it('should return value for Dawnsparks', () => {
    const value1 = getCardValue('W16', 1)
    const value5 = getCardValue('W16', 5)
    expect(value1[0]).toEqual((8 / 6) * 0.5)
    expect(value1[1]).toEqual((8 / 6) * 0.5)
    expect(value5[0]).toEqual((18 / 6) * 0.5)
    expect(value5[1]).toEqual((18 / 6) * 0.5)
  })

  it('should return value for Wolfcloaks', () => {
    const value1 = getCardValue('W17', 1)
    const value5 = getCardValue('W17', 5)
    expect(value1[0]).toEqual((1 / 6) * 1.5)
    expect(value1[1]).toEqual((7 / 6) * 1.5)
    expect(value5[0]).toEqual((1 / 6) * 1.5)
    expect(value5[1]).toEqual((13 / 6) * 1.5)
  })

  it('should return value for Fleshmenders', () => {
    const value1 = getCardValue('W18', 1)
    const value5 = getCardValue('W18', 5)
    expect(value1[0]).toEqual((5 / 7) * 1.5)
    expect(value1[1]).toEqual(((5 + 6) / 7) * 1.5)
    expect(value5[0]).toEqual((9 / 7) * 1.5)
    expect(value5[1]).toEqual(((9 + 12) / 7) * 1.5)
  })

  it.skip('should return value for Gift of the Wise', () => {
    const value1 = getCardValue('W19', 1)
    const value5 = getCardValue('W19', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Calming Spirits', () => {
    const value1 = getCardValue('W20', 1)
    const value5 = getCardValue('W20', 5)
    expect(value1[0]).toEqual((10 / 7) * 0.5)
    expect(value1[1]).toEqual((10 / 7) * 0.5)
    expect(value5[0]).toEqual((24 / 7) * 0.5)
    expect(value5[1]).toEqual((24 / 7) * 0.5)
  })

  it('should return value for Visions of the Grove', () => {
    const value1 = getCardValue('W21', 1)
    const value5 = getCardValue('W21', 5)
    expect(value1[0]).toEqual((8 / 8) * 0.5)
    expect(value1[1]).toEqual(((8 + ((MAX_MANA - 8) / 4) * 5) / 8) * 0.5)
    expect(value5[0]).toEqual((18 / 8) * 0.5)
    expect(value5[1]).toEqual(((18 + ((MAX_MANA - 8) / 2) * 5) / 8) * 0.5)
  })

  it('should return value for Chillbeards', () => {
    const value1 = getCardValue('W22', 1)
    const value5 = getCardValue('W22', 5)
    expect(value1[0]).toEqual((4 / 9) * 1.5)
    expect(value1[1]).toEqual(((4 + 3) / 9) * 1.5)
    expect(value5[0]).toEqual((8 / 9) * 1.5)
    expect(value5[1]).toEqual(((8 + 7) / 9) * 1.5)
  })

  it('should return value for Olf the Hammer', () => {
    const value1 = getCardValue('W23', 1)
    const value5 = getCardValue('W23', 5)
    expect(value1[0]).toEqual((6 / 9) * 1.5)
    expect(value1[1]).toEqual(((6 + 3) / 9) * 1.5)
    expect(value5[0]).toEqual((12 / 9) * 1.5)
    expect(value5[1]).toEqual(((12 + 6) / 9) * 1.5)
  })

  it.skip('should return value for Underground Spring', () => {
    const value1 = getCardValue('W24', 1)
    const value5 = getCardValue('W24', 5)
    expect(value1[0]).toEqual()
    expect(value1[1]).toEqual()
    expect(value5[0]).toEqual()
    expect(value5[1]).toEqual()
  })

  it('should return value for Iced Droplings', () => {
    const value1 = getCardValue('W25', 1)
    const value5 = getCardValue('W25', 5)
    expect(value1[0]).toEqual((7 / 6) * 1)
    expect(value1[1]).toEqual((7 / 6) * 1)
    expect(value5[0]).toEqual((15 / 6) * 1)
    expect(value5[1]).toEqual((15 / 6) * 1)
  })

  it('should return value for Sleetstompers', () => {
    const value1 = getCardValue('W26', 1)
    const value5 = getCardValue('W26', 5)
    expect(value1[0]).toEqual((6 / 8) * 1.5)
    expect(value1[1]).toEqual((6 / 8) * 1.5)
    expect(value5[0]).toEqual((12 / 8) * 1.5)
    expect(value5[1]).toEqual((12 / 8) * 1.5)
  })

  it('should return value for Earthfathers', () => {
    const value1 = getCardValue('W27', 1)
    const value5 = getCardValue('W27', 5)
    expect(value1[0]).toEqual((5 / 7) * 1)
    expect(value1[1]).toEqual(((5 + 3) / 7) * 1)
    expect(value5[0]).toEqual((11 / 7) * 1)
    expect(value5[1]).toEqual(((11 + 4) / 7) * 1)
  })

  it('should return value for Chilled Stonedames', () => {
    const value1 = getCardValue('W28', 1)
    const value5 = getCardValue('W28', 5)
    expect(value1[0]).toEqual((4 / 5) * 1)
    expect(value1[1]).toEqual(((4 + 2 * 4) / 5) * 1)
    expect(value5[0]).toEqual((8 / 5) * 1)
    expect(value5[1]).toEqual(((8 + 6 * 4) / 5) * 1)
  })

  it('should return value for Iceflakes', () => {
    const value1 = getCardValue('W31', 1)
    const value5 = getCardValue('W31', 5)
    expect(value1[0]).toEqual((3 / 2) * 0.5)
    expect(value1[1]).toEqual((3 / 2) * 0.5)
    expect(value5[0]).toEqual((7 / 2) * 0.5)
    expect(value5[1]).toEqual((7 / 2) * 0.5)
  })
})
