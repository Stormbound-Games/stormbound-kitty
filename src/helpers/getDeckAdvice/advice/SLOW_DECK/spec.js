import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `SLOW_DECK` advice', () => {
  it('should be returned if a deck has over 6 static cards', () => {
    const cards = getCards('4n382s195n131n702n232n625n194n345n32s34s13s14')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if a deck has under 7 static cards', () => {
    const cards = getCards('5n15n25w25n35n45n124w34w44w65n285w124w14')
    expect(advice(cards)).to.equal(null)
  })

  it('should not count Bigthrust Tigers as a static card', () => {
    const cards = getCards('5n15n25n35n44n54n62n622n665n115n125n145n16')
    expect(advice(cards)).to.equal(null)
  })

  it('should not count Wild Saberpaws as a static card', () => {
    const cards = getCards('5n15n25n35n44n54n62n622n675n115n125n145n16')
    expect(advice(cards)).to.equal(null)
  })

  it('should not count Twilight Prowlers as a static card', () => {
    const cards = getCards('5n15n25n35n44n54n62n622n685n115n125n145n16')
    expect(advice(cards)).to.equal(null)
  })
})
