import getDeckPresets from './'
import serialisation from '../serialisation'
import getResolvedCardData from '../getResolvedCardData'

describe('The `getDeckPresets` helper', () => {
  it('should return default presets for a non-suggested deck', () => {
    const deck = serialisation.deck
      .deserialise('5n15n25f44f13f25f35n35n44n54n65n125n28')
      .deck.map(getResolvedCardData)
    expect(getDeckPresets(deck)).to.deep.equal({
      modifier: 'NONE',
      equals: false,
    })
  })

  it('should return brawl ID for a Brawl deck', () => {
    const deck = serialisation.deck
      .deserialise('5n15s15n35n675s65s85s115s135n355s285s215s22')
      .deck.map(getResolvedCardData)
    expect(getDeckPresets(deck)).to.deep.equal({
      modifier: 'UNDEAD_STRENGTH',
      equals: false,
    })
  })

  it('should return equals for a tournament deck', () => {
    const deck = serialisation.deck
      .deserialise('1n11i11i21n61n81n111i71i201i171i191n461n47')
      .deck.map(getResolvedCardData)
    expect(getDeckPresets(deck)).to.deep.equal({
      modifier: 'NONE',
      equals: true,
    })
  })
})
