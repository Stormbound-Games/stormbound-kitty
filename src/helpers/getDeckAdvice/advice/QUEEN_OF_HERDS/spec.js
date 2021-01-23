import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id).deck, modifier).map(
    getResolvedCardData
  )

describe('The `QUEEN_OF_HERDS` advice', () => {
  it('should be returned if it contains Queen of Herds', () => {
    const cards = getCards('1n21n31s241n621n661n121n191n241s181n371s211s22')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if it does not include Queen of Herds', () => {
    const cards = getCards('1n21n41n61n631n71n81s61n141n211s271n441n70')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if it contains Queen of Herds and enough satyrs', () => {
    const cards = getCards('1n41n631n71n81s61n141n211s271s281n441s211n70')
    expect(advice(cards)).to.equal(null)
  })
})
