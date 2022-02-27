import advice from '.'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(
    global.__CARDS_INDEX__,
    serialization.deck.deserialize(global.__CARDS_INDEX_BY_SID__, id),
    modifier
  ).map(card => getResolvedCardData(global.__CARDS_INDEX__, card))

describe('The `HEROIC_SOLDIERS` advice', () => {
  it('should not be returned if it doesn’t have Heroic Soldiers', () => {
    const cards = getCards('1xn1n2n3n13n23n16n19n28n30n82n72n54')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has Fluffy Badboxers', () => {
    const cards = getCards('1xn1n2n3n13n23n16n19n28n30n60n72n54')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if it has Heroic Soldiers but not Fluffy Badboxers', () => {
    const cards = getCards('1xn1n2n3n13n23n16n19n28n30n32n72n54')
    expect(advice(cards)).not.toEqual(null)
  })
})
