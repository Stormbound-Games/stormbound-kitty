import advice from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(
    global.__CARDS_INDEX__,
    serialization.deck.deserialize(global.__CARDS_INDEX_BY_SID__, id),
    modifier
  ).map(card => getResolvedCardData(global.__CARDS_INDEX__, card))

describe('The `AOE` advice', () => {
  it('should handle lack of aoe', () => {
    const cards = getCards('1n11n21n31n671n71n101n201i141n651n271i281n76')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should consider Beasts of Terror an AoE', () => {
    const cards = getCards('1n11n21n31n671n71n101n181n201i141n651n271i28')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Victors of the Melee an AoE', () => {
    const cards = getCards('1n11n21n31n671n71n101n201i141n651n271i281n47')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Hunter’s Vengeance an AoE', () => {
    const cards = getCards('1n11n21n31n671n71n101n231n201i141n651n271i28')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Bladestorm an AoE', () => {
    const cards = getCards('1n11n21n31n671n71n101n201i141n651n271n291i28')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Voidsurgers an AoE', () => {
    const cards = getCards('1n11n21n31n671n71n101n201i141n651n271n361i28')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Needle Blast an AoE', () => {
    const cards = getCards('1n11n21n31n671n71n101n201i141n651n271i281n44')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Powder Tower an AoE', () => {
    const cards = getCards('1n11n21n31n671n71n101n201i141n651n271i281n45')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Joust Champions an AoE', () => {
    const cards = getCards('1n11n21n31n671n71n101n201i141n651n271i281n55')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Crazy Bombers an AoE', () => {
    const cards = getCards('1n11n21n31n671n71n101n201i141n651n271i281n57')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Siren of the Seas an AoE', () => {
    const cards = getCards('1n11n21n31n671n71n101n201i141n651n271i281n58')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Unhealthy Hysteria an AoE', () => {
    const cards = getCards('5n15n25n33n632n673n72n102n204i142n653n272i28')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Trekking Aldermen an AoE', () => {
    const cards = getCards('1n11n21n31n671n71n101n731n201i141n651n271i28')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Broken Earth Drake an AoE', () => {
    const cards = getCards('1n11n21n31n41n621n151w71n241w81w161n381w15')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Flaming Stream an AoE', () => {
    const cards = getCards('1n11n21n31n671n71n101n201i141n651n271i181i28')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Windmakers an AoE', () => {
    const cards = getCards('1n11n21n31n671n71n101n201i141n651n271i201i28')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Toxic Sacrifice an AoE', () => {
    const cards = getCards('1n21f41f31n31n661f271n591n211n751n641f161n76')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Crimson Sentry an AoE', () => {
    const cards = getCards('1n21f31n31n661f51f271n591n211n751n641f161n76')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Witches of the Wild an AoE', () => {
    const cards = getCards('1n21f31n31n661f271n591n211n751n641f141f161n76')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Dark Harvest an AoE', () => {
    const cards = getCards('1n631n141s251n191n91s121n241n261s151s191n461n48')
    expect(advice(cards)).toEqual(null)
  })

  it('should consider Lasting Remains an AoE', () => {
    const cards = getCards('1n631n141s251n191n91s121n241n261s191s231n461n48')
    expect(advice(cards)).toEqual(null)
  })
})
