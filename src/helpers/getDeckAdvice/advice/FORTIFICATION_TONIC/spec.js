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

describe('The `FORTIFICATION_TONIC` advice', () => {
  it('should not be returned if it doesn’t have Fortification Tonic', () => {
    const cards = getCards('5n15n25i15n35n65i55n135i75n185i135i205n39')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if there are not enough structures', () => {
    const cards = getCards('1n21n631i31i61n221n751i151i271n281i171n461n57')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should be returned if structures are too expensive', () => {
    const cards = getCards('5n15n25i15n35n61i35i75n181i145i201n345n39')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if there are cheap structures', () => {
    const cards = getCards('5n15n25i15n35n65i55n131i35i75n185i205n39')
    expect(advice(cards)).toEqual(null)
  })
})
