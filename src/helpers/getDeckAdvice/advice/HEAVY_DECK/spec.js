import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `HEAVY_DECK` advice', () => {
  it('should be returned if the deck average cost is above 5.5', () => {
    const cards = getCards('1n701n481n491n501n511n521n531n541n551n561n571n58')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if the deck average cost is below 5.5', () => {
    const cards = getCards('5n15n25w25n35n45n124w34w44w65n285w124w14')
    expect(advice(cards)).to.equal(null)
  })
})
