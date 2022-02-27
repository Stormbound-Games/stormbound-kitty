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

describe('The `HIGH_PRIESTESS_KLAXI` advice', () => {
  it('should not be returned if it doesn’t have Klaxi', () => {
    const cards = getCards('5n15f85n25f45f35n35n675n95n155f105n405n76')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has Rain of Frogs', () => {
    const cards = getCards('5n15f85n25f45f35n31n45n675n95n155n401f23')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has Azure Hatchers', () => {
    const cards = getCards('5n15n25f45f35n31n45n675n95n151f105n401f23')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has efficient Brood Sages', () => {
    const cards = getCards('5n15n25f41f15f35n31n45n675n95n155n401f23')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if Klaxi is inefficient', () => {
    const cards = getCards('5f45n85n615n185n95n255f135n315n345n365n385f23')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should be returned if it has inefficient Brood Sages', () => {
    const cards = getCards('5n25f15n45n75n735n195n95n215n245n365n705f23')
    expect(advice(cards)).not.toEqual(null)
  })
})
