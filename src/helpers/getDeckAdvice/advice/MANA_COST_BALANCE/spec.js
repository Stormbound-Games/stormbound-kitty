import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `MANA_COST_BALANCE` advice', () => {
  it('should be returned if there are at least 9 cards costing an odd number of mana', () => {
    const cards = getCards('5n15n25n35n44n52n663n73n85n92n105n115n12')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if there are less then 9 cards costing an odd number of mana', () => {
    const cards = getCards('5n15n25n35n44n54n62n663n73n85n92n105n11')
    expect(advice(cards)).to.equal(null)
  })

  it('should be returned if there are at least 9 cards costing an even number of mana', () => {
    const cards = getCards('5n15n25n35n44n54n62n623n632n672n664n185n19')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should not be returned if there are less then 9 cards costing an even number of mana', () => {
    const cards = getCards('5n15n25n35n44n54n62n623n632n672n663n74n18')
    expect(advice(cards)).to.equal(null)
  })

  it('should not count cards costing 0 mana', () => {
    const cards = getCards(
      '5n25f45n35n44n54n62n623n632n672f84n185n19',
      'SPELL_MANA'
    )
    expect(advice(cards)).to.equal(null)
  })
})
