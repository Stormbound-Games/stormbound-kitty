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

describe('The `DOCTOR_MIA` advice', () => {
  it('should not be returned if it doesn’t have Mia', () => {
    const cards = getCards('5n15n25i15n35n65i55n135i75n185i135i205n39')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if it has only Fort of Ebonrock', () => {
    const cards = getCards('5n15n25i11i25n31n45n65n135i75n185i135i20')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should be returned if it has only Unstable Build', () => {
    const cards = getCards('5n15n25i11i25n31n45n61i55i75n185i135i20')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should be returned if it has only Mech Workshop', () => {
    const cards = getCards('5n15n25i11i25n31n45n65i75n185i131i145i20')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if it has a good structure', () => {
    const cards = getCards('5n15n25i11i25n31n45n65i71i105n185i135i20')
    expect(advice(cards)).toEqual(null)
  })
})
