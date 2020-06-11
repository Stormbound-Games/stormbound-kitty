import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `UPGRADE_POINT` advice', () => {
  it('should be returned if it contains more than 3 structures', () => {
    const cards = getCards('1n31i51n131n231i101n161n591n221n641n601n451n57')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if it has 3 structures', () => {
    const cards = getCards('1n11n31i51n131n231n161n591n221n641n601n451n57')
    expect(advice(cards)).to.equal(null)
  })
})
