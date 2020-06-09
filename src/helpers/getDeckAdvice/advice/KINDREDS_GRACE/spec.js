import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `KINDREDS_GRACE` advice', () => {
  it('should be returned if too many races are represented', () => {
    const cards = getCards('1n11n21f31n31n41n51n621n631n81n111n131n40')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if the deck contains Azure Hatchers', () => {
    const cards = getCards('1n11n21n31n41n51n621n631n81n111n131f101n40')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if the deck contains Rain of Frogs', () => {
    const cards = getCards('1n11n21n31n41n51n621n631n81n111n131f81n40')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if the deck enough units of the same race represented', () => {
    const cards = getCards('1n11i11n51n81n111i81i61n241i271i161i211n40')
    expect(advice(cards)).to.equal(null)
  })
})
