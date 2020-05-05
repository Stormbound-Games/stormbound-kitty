import { deserialiseDeck } from '../../../../src/helpers/deserialise'

describe('The `deserialiseDeck` helper', () => {
  it('should handle decks serialised with the old system', () => {
    expect(
      deserialiseDeck(
        'NU4xLDVOMiw1RjIsNUYzLDVOMyw1RjUsNU4xMiw1TjE2LDVGMTQsNUYxNSw1TjMwLDVONTc='
      )
    ).to.deep.equal([
      { level: 5, id: 'N1' },
      { level: 5, id: 'N2' },
      { level: 5, id: 'F2' },
      { level: 5, id: 'F3' },
      { level: 5, id: 'N3' },
      { level: 5, id: 'F5' },
      { level: 5, id: 'N12' },
      { level: 5, id: 'N16' },
      { level: 5, id: 'F14' },
      { level: 5, id: 'F15' },
      { level: 5, id: 'N30' },
      { level: 5, id: 'N57' },
    ])
  })

  it('should deserialise a deck', () => {
    expect(
      deserialiseDeck(
        'NU4xNU4yNUYyNUYzNU4zNUY1NU4xMjVOMTY1RjE0NUYxNTVOMzA1TjU3'
      )
    ).to.deep.equal([
      { level: 5, id: 'N1' },
      { level: 5, id: 'N2' },
      { level: 5, id: 'F2' },
      { level: 5, id: 'F3' },
      { level: 5, id: 'N3' },
      { level: 5, id: 'F5' },
      { level: 5, id: 'N12' },
      { level: 5, id: 'N16' },
      { level: 5, id: 'F14' },
      { level: 5, id: 'F15' },
      { level: 5, id: 'N30' },
      { level: 5, id: 'N57' },
    ])
  })

  it('should deserialise a series of cards smaller than 12', () => {
    expect(deserialiseDeck('NU4xNU4yNUYyNUYz')).to.deep.equal([
      { level: 5, id: 'N1' },
      { level: 5, id: 'N2' },
      { level: 5, id: 'F2' },
      { level: 5, id: 'F3' },
    ])
  })

  it('should handle tokens', () => {
    expect(deserialiseDeck('MDFUMTA1VDIxMFQzOTlUNA==')).to.deep.equal([
      { level: 1, id: 'T1' },
      { level: 5, id: 'T2' },
      { level: 10, id: 'T3' },
      { level: 99, id: 'T4' },
    ])
  })
})
