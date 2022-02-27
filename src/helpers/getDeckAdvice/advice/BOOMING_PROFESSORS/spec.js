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

describe('The `BOOMING_PROFESSORS` advice', () => {
  it('should be returned if it contains Booming Professors and not Destructobots', () => {
    const cards = getCards('1xn67n16n19i14i15i27n78i20n38i28i21n52')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if it contains Booming Professors and Destructobots', () => {
    const cards = getCards('1xi1n67n19i14i15i27n78i20n38i28i21n52')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it contains neither Booming Professors and Destructobots', () => {
    const cards = getCards('1xn16n19n78i15n67n20i14n38i21i27n52i20')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it contains Destructobots and not Booming Professors', () => {
    const cards = getCards('1xn1i1n67n19i14i15i27n78i20n38i21n52')
    expect(advice(cards)).toEqual(null)
  })
})
