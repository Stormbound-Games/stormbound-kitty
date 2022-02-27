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

describe('The `UPGRADE_POINT` advice', () => {
  it('should not be returned if it doesn’t have Upgrade Point', () => {
    const cards = getCards('5n15n25i15n35n65i55n135i75n185i135i205n39')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has at least 5 constructs', () => {
    const cards = getCards('5n15n25i15n31i45i51i81i101i61i275i205n39')
    expect(advice(cards)).toEqual(null)
  })

  it('should lower threshold by one if it has Doctor Mia', () => {
    const cards = getCards('5n15n25i11i25n31i45i51i81i101i65i205n39')
    expect(advice(cards)).toEqual(null)
  })

  it('should lower threshold by one if it has Mech Worskhop', () => {
    const cards = getCards('5n15n25i15n31i45i51i81i101i61i145i205n39')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if it has less than 5 constructs', () => {
    const cards = getCards('1n11n21i11n31i41n121i101i141i151n301n321n46')
    expect(advice(cards)).not.toEqual(null)
  })
})
