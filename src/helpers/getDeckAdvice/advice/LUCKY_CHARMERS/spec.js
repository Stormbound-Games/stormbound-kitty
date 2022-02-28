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

describe('The `LUCKY_CHARMERS` advice', () => {
  it('should be returned if there are not enough pirates', () => {
    const cards = getCards('1n11n21f41f11n31f91n161n591n221f201n421n56')
    expect(advice(cards)).not.toEqual(null)
  })
})
