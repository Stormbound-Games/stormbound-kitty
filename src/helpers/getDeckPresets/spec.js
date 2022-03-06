import getDeckPresets from './'

describe('The `getDeckPresets` helper', () => {
  it('should return default presets for a non-suggested deck', () => {
    const deck = { id: '5n15n25f44f13f25f35n35n44n54n65n125n28', tags: [] }

    expect(getDeckPresets(global.__BRAWLS__, deck)).toEqual({
      modifier: 'NONE',
      equals: false,
    })
  })

  it('should return brawl ID for a Brawl deck', () => {
    const deck = {
      id: '5n15s15n35n675s65s85s115s135n355s285s215s22',
      tags: ['UNDEAD_STRENGTH', 'BRAWL'],
    }
    expect(getDeckPresets(global.__BRAWLS__, deck)).toEqual({
      modifier: 'UNDEAD_STRENGTH',
      equals: false,
    })
  })

  it('should return equals for a tournament deck', () => {
    const deck = {
      id: '1n11i11i21n61n81n111i71i201i171i191n461n47',
      tags: ['EQUALS'],
    }

    expect(getDeckPresets(global.__BRAWLS__, deck)).toEqual({
      modifier: 'NONE',
      equals: true,
    })
  })
})
