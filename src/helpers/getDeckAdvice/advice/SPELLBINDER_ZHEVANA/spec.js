import advice from './'
import getResolvedCardData from '~/getResolvedCardData'
import serialisation from '~/serialisation'
import modifyDeck from '~/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `SPELLBINDER_ZHEVANA` advice', () => {
  it('should not be returned if it doesn’t have Zhevana', () => {
    const cards = getCards('3n13n33n673n733w53n183n753w243w133n393n453w19')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if it has Midwinter Chaos', () => {
    const cards = getCards('1n11w11w21n51n81n121w281w111w81w161n461n52')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if it has Moment’s Peace', () => {
    const cards = getCards('1n11w11w21n51n81n121w281w81w61w161n461n52')
    expect(advice(cards)).to.equal(null)
  })

  it('should be returned if Zhevana is deemed inefficient', () => {
    const cards = getCards('1n501w191n621w171n701n51n631n141w81w281n151n41')
    expect(advice(cards)).to.not.equal(null)
  })
})
