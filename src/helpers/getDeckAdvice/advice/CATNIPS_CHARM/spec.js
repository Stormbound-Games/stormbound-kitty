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

describe('The `CATNIPS_CHARM` advice', () => {
  it('should not be returned if it doesn’t have Catnip’s Charm', () => {
    const cards = getCards('1n895n11n665s15n35n65n675s45n235n185s155n82')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if it has only one feline', () => {
    const cards = getCards('5n11n1055s15n35n65n675s45n235n185s155n825s19')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if it at least 2 felines', () => {
    const cards = getCards('5n11n661n1055s15n35n65n675s45n235n185s155n82')
    expect(advice(cards)).toEqual(null)
  })
})
