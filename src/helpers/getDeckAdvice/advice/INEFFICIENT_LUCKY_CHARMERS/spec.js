import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `INEFFICIENT_LUCKY_CHARMERS` advice', () => {
  it('should be returned if there are not enough pirates', () => {
    const cards = getCards('1n11n21f41f11n31f91n161n591n221f201n421n56')
    expect(advice(cards)).to.not.equal(null)
  })
})
