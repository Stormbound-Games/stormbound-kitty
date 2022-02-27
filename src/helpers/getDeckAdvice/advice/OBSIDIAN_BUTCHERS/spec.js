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

describe('The `OBSIDIAN_BUTCHERS` advice', () => {
  it('should not be returned if it doesn’t have Obsidien Butchers', () => {
    const cards = getCards('5n15f85n25f45f35n35n675n95n155f105n405n76')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has Rain of Frogs', () => {
    const cards = getCards('5n15f85n25f45f35n31n45n675n95n151f175n40')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has Azure Hatchers', () => {
    const cards = getCards('5n15n25f45f35n31n45n675n95n151f101f175n40')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has efficient Brood Sages', () => {
    const cards = getCards('5n15n25f41f15f35n31n45n675n95n151f175n40')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if Obsidian Butchers are inefficient', () => {
    const cards = getCards('5n625n665n105f275n95n595f135n315f175n765f215f22')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should be returned if it has inefficient Brood Sages', () => {
    const cards = getCards('5n15n21f15f35n31n41n55n675n95n151f175n40')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if it has Ludic Matriarchs and at least two other dragons', () => {
    const cards = getCards('4n14n23n665f34n34n43n63n673n105f54f171n43')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if it has Ludic Matriarchs and less than 2 other dragons', () => {
    const cards = getCards('4n14n23n665f34n34n43n53n63n675f54f171n43')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should be returned if Ludic Matriarchs is over level 2', () => {
    const cards = getCards('4n14n23n665f34n34n43n63n673n105f54f173n43')
    expect(advice(cards)).not.toEqual(null)
  })
})
