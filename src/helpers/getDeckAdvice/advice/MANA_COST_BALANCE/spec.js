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

describe('The `MANA_COST_BALANCE` advice', () => {
  it('should be returned if there are at least 9 cards costing an odd number of mana', () => {
    const cards = getCards('5n15n25n35n44n53n73n85n92n105n115n121n13')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if there are less then 9 cards costing an odd number of mana', () => {
    const cards = getCards('5n15n25n35n44n54n62n663n73n85n92n105n11')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if there are at least 9 cards costing an even number of mana', () => {
    const cards = getCards('5n15n25n31n235n44n54n62n622n672n664n185n19')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if there are less then 9 cards costing an even number of mana', () => {
    const cards = getCards('5n15n25n35n44n54n62n623n632n672n663n74n18')
    expect(advice(cards)).toEqual(null)
  })

  it('should not count cards costing 0 mana', () => {
    const cards = getCards(
      '5n25f45n35n44n54n62n623n632n672f84n185n19',
      'SPELL_MANA'
    )
    expect(advice(cards)).toEqual(null)
  })
})
