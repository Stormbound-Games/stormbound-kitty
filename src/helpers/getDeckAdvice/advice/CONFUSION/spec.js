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

describe('The `CONFUSION` advice', () => {
  it('should not be returned if it doesn’t contain Hair-Raising Cats or Melodious Sisters', () => {
    const cards = getCards('5n15f134f15f35n35n44n55n125n164f105f145n30')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it contains Sweetcap Kittens', () => {
    const cards = getCards('5n14f15f35n35n44n52n625n125n164f101n645f14')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it contains Fluffy Badboxers', () => {
    const cards = getCards('5n14f15f35n35n44n55n125n164f101n645f142n60')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if there are inefficient confusion combos', () => {
    const cards = getCards('1n11n21f41n81n611n181n91f131n341n361n381f23')
    expect(advice(cards)).not.toEqual(null)
  })
})
