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

describe('The `ARCHDRUID_EARYN` advice', () => {
  it('should not be returned if it doesn’t have Earyn', () => {
    const cards = getCards('5n11n25n35n44n51n61n621n631n671n665n125n16')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if there are less than 2 spells for Earyn level 3', () => {
    const cards = getCards('1n895n11n665n35n44n51n61n621n675n121n633n48')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if there are 2 or more spells for Earyn level 3', () => {
    const cards = getCards('5n11n25n35n44n51n61n621n631n675n121n231n48')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if there are less than 3 spells for Earyn level 4', () => {
    const cards = getCards('5n11n25n35n44n51n61n621n631n671n665n124n48')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if there are 3 or more spells for Earyn level 4', () => {
    const cards = getCards('5n11n25n35n44n51n61n621n631n671n234n154n48')
    expect(advice(cards)).toEqual(null)
  })
})
