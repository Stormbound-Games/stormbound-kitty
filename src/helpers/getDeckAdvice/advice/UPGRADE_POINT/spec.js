import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `UPGRADE_POINT` advice', () => {
  it('should not be returned if it doesn’t have Upgrade Point', () => {
    const cards = getCards('5n15n25i15n35n65i55n135i75n185i135i205n39')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if it has at least 5 constructs', () => {
    const cards = getCards('5n15n25i15n31i45i51i81i101i61i275i205n39')
    expect(advice(cards)).to.equal(null)
  })

  it('should lower threshold by one if it has Doctor Mia', () => {
    const cards = getCards('5n15n25i11i25n31i45i51i81i101i65i205n39')
    expect(advice(cards)).to.equal(null)
  })

  it('should lower threshold by one if it has Mech Worskhop', () => {
    const cards = getCards('5n15n25i15n31i45i51i81i101i61i145i205n39')
    expect(advice(cards)).to.equal(null)
  })

  it('should be returned if it has less than 5 constructs', () => {
    const cards = getCards('1n11n21i11n31i41n121i101i141i151n301n321n46')
    expect(advice(cards)).to.not.equal(null)
  })
})
