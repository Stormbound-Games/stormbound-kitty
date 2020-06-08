import advice, { POISON_PROVIDERS } from './'
import getResolvedCardData from '../../../getResolvedCardData'
import getRawCardData from '../../../getRawCardData'
import serialisation from '../../../serialisation'
import modifyDeck from '../../../modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `INEFFICIENT_BROOD_SAGES` advice', () => {
  it('should not be returned if it doesn’t have Brood Sages', () => {
    const cards = getCards('5n15f35n35n44n55f45n125n164f105f145n304f20')
    expect(advice(cards)).to.equal(null)
  })

  POISON_PROVIDERS.forEach(id => {
    const { name } = getRawCardData(id)

    it(`should not be returned if there is also ${name}`, () => {
      const cards = getCards(`5n15${id}4f15f35n35n44n55n125n164f105f145n30`)
      expect(advice(cards)).to.equal(null)
    })
  })

  it('should be returned if Brood Sages are deemed inefficient', () => {
    const cards = getCards('1n11f11n41n671n71n141f61n161n331n451n701n55')
    expect(advice(cards)).to.not.equal(null)
  })
})
