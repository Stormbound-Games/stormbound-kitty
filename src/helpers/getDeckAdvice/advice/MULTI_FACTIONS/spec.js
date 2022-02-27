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

describe('The `MULTI_FACTIONS` advice', () => {
  it('should be returned if there are multiple factions', () => {
    const cards = getCards('5n15n25n33n633n71n643w114w72i253f172s184n44')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if there is a single faction', () => {
    const cards = getCards('5n15n25w25n35n45n124w34w44w65n285w124w14')
    expect(advice(cards)).toEqual(null)
  })
})
