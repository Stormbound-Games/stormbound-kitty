import advice from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialisation from '~/helpers/serialisation'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `LUCKY_CHARMERS` advice', () => {
  it('should be returned if there are not enough pirates', () => {
    const cards = getCards('1n11n21f41f11n31f91n161n591n221f201n421n56')
    expect(advice(cards)).to.not.equal(null)
  })
})
