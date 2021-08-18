import advice from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialisation from '~/helpers/serialisation'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `MULTI_FACTIONS` advice', () => {
  it('should be returned if there are multiple factions', () => {
    const cards = getCards('5n15n25n33n633n71n643w114w72i253f172s184n44')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if there is a single faction', () => {
    const cards = getCards('5n15n25w25n35n45n124w34w44w65n285w124w14')
    expect(advice(cards)).to.equal(null)
  })
})
