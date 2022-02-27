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

describe('The `LINKED_GOLEMS` advice', () => {
  it('should not be returned if it doesn’t have Linked Golems', () => {
    const cards = getCards('5n15n25i15n35n65i55n135i75n185i135i205n39')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if there are less than 3 constructs', () => {
    const cards = getCards('1i11n51i41n101i81n731n191n281i201n381n701n55')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if there are at least 3 constructs', () => {
    const cards = getCards('1n11i11n51i41n101i81n731n191n281i201n381n70')
    expect(advice(cards)).toEqual(null)
  })
})
