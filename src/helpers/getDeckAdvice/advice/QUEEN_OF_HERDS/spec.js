import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `QUEEN_OF_HERDS` advice', () => {
  it('should be returned if it contains Queen of Herds', () => {
    const cards = getCards('1n21s241n621n661n121n191n241n251s181n371s211s22')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if it does not include Queen of Herds', () => {
    const cards = getCards('1n11n21s241n621n661n121n191n241n251s181n371s22')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if it contains Queen of Herds and enough satyrs', () => {
    const cards = getCards('1n11n21s11s241n41n621s141n241n251s181s211s22')
    expect(advice(cards)).to.equal(null)
  })
})
