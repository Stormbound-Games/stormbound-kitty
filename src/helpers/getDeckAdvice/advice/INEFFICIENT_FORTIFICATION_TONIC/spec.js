import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `INEFFICIENT_FORTIFICATION_TONIC` advice', () => {
  it('should not be returned if it doesn’t have Fortification Tonic', () => {
    const cards = getCards('5n15n25i15n35n65i55n135i75n185i135i205n39')
    expect(advice(cards)).to.equal(null)
  })

  it('should be returned if there are not enough structures', () => {
    const cards = getCards('1n21n631i31i61n221n751i151i271n281i171n461n57')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should be returned if structures are too expensive', () => {
    const cards = getCards('5n15n25i15n35n61i35i75n181i145i201n345n39')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if there are cheap structures', () => {
    const cards = getCards('5n15n25i15n35n65i55n131i35i75n185i205n39')
    expect(advice(cards)).to.equal(null)
  })
})
