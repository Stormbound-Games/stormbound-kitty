import advice from '.'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialisation from '~/helpers/serialisation'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

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
