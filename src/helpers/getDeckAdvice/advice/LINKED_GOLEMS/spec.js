import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id).deck, modifier).map(
    getResolvedCardData
  )

describe('The `LINKED_GOLEMS` advice', () => {
  it('should not be returned if it doesn’t have Linked Golems', () => {
    const cards = getCards('5n15n25i15n35n65i55n135i75n185i135i205n39')
    expect(advice(cards)).to.equal(null)
  })

  it('should be returned if there are less than 3 constructs', () => {
    const cards = getCards('1i11n51i41n101i81n731n191n281i201n381n701n55')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if there are at least 3 constructs', () => {
    const cards = getCards('1n11i11n51i41n101i81n731n191n281i201n381n70')
    expect(advice(cards)).to.equal(null)
  })
})
