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

describe('The `SPELLBINDER_ZHEVANA` advice', () => {
  it('should not be returned if it doesn’t have Zhevana', () => {
    const cards = getCards('3n13n33n673n733w53n183n753w243w133n393n453w19')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has Midwinter Chaos', () => {
    const cards = getCards('1n11w11w21n51n81n121w281w111w81w161n461n52')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has Moment’s Peace', () => {
    const cards = getCards('1n11w11w21n51n81n121w281w81w61w161n461n52')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has Icicle Burst', () => {
    const cards = getCards('1n11w11w21n51n81n121w281w81w11w161n461n52')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has Blizzard Bombs', () => {
    const cards = getCards('1n11w11w21n51n81n121w281w81w321w161n461n52')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has Frosthexers', () => {
    const cards = getCards('1n11w11w21n51n81n121w281w81w21w161n461n52')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if Zhevana is deemed inefficient', () => {
    const cards = getCards('1n501w191n621w171n701n51n631n141w81w281n151n41')
    expect(advice(cards)).not.toEqual(null)
  })
})
