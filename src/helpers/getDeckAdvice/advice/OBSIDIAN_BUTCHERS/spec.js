import advice from './'
import getResolvedCardData from '../../../getResolvedCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id).deck, modifier).map(
    getResolvedCardData
  )

describe('The `OBSIDIAN_BUTCHERS` advice', () => {
  it('should not be returned if it doesn’t have Obsidien Butchers', () => {
    const cards = getCards('5n15f85n25f45f35n35n675n95n155f105n405n76')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if it has Rain of Frogs', () => {
    const cards = getCards('5n15f85n25f45f35n31n45n675n95n151f175n40')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if it has Azure Hatchers', () => {
    const cards = getCards('5n15n25f45f35n31n45n675n95n151f101f175n40')
    expect(advice(cards)).to.equal(null)
  })

  it('should not be returned if it has efficient Brood Sages', () => {
    const cards = getCards('5n15n25f41f15f35n31n45n675n95n151f175n40')
    expect(advice(cards)).to.equal(null)
  })

  it('should be returned if Obsidian Butchers are inefficient', () => {
    const cards = getCards('5n625n665n105f275n95n595f135n315f175n765f215f22')
    expect(advice(cards)).to.not.equal(null)
  })

  it('should be returned if it has inefficient Brood Sages', () => {
    const cards = getCards('5n15n21f15f35n31n41n55n675n95n151f175n40')
    expect(advice(cards)).to.not.equal(null)
  })
})
