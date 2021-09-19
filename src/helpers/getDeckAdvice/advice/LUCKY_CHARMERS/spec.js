import advice from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialization.deck.deserialize(id), modifier).map(
    getResolvedCardData
  )

describe('The `LUCKY_CHARMERS` advice', () => {
  it('should be returned if there are not enough pirates', () => {
    const cards = getCards('1n11n21f41f11n31f91n161n591n221f201n421n56')
    expect(advice(cards)).not.toEqual(null)
  })
})
