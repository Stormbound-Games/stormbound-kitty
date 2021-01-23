import serialisation from './'

describe('The `serialisation.deck.serialise` helper', () => {
  it('should serialise some cards', () => {
    expect(serialisation.deck.serialise([{ level: 1, id: 'N1' }])).to.equal(
      '1n1'
    )
  })

  it('should handle tokens with a forced padding', () => {
    expect(
      serialisation.deck.serialise([
        { level: 1, id: 'T1', token: true },
        { level: 10, id: 'T2', token: true },
      ])
    ).to.equal('01t110t2')
  })

  it('should strip out empty cards', () => {
    expect(
      serialisation.deck.serialise([{ level: 1, id: 'N1' }, null, {}])
    ).to.equal('1n1')
  })

  it('should use global level above 3 cards', () => {
    expect(
      serialisation.deck.serialise([
        { level: 1, id: 'N1' },
        { level: 1, id: 'N2' },
        { level: 1, id: 'N3' },
      ])
    ).to.equal('1xn1n2n3')
  })
})

describe('The `serialisation.deck.deserialise` helper', () => {
  it('should handle decks serialised with the old system', () => {
    expect(
      serialisation.deck.deserialise(
        window.btoa('5N1,5N2,5F2,5F3,5N3,5F5,5N12,5N16,5F14,5F15,5N30,5N57')
      ).deck
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
      serialisation.deck.deserialise(
        '5n15n25f25f35n35f55n125n165f145f155n305n57'
      ).deck
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
    expect(serialisation.deck.deserialise('5n15n25f25f3').deck).to.deep.equal([
      { level: 5, id: 'N1' },
      { level: 5, id: 'N2' },
      { level: 5, id: 'F2' },
      { level: 5, id: 'F3' },
    ])
  })

  it('should handle tokens', () => {
    expect(
      serialisation.deck.deserialise('01t105t210t399t4').deck
    ).to.deep.equal([
      { level: 1, id: 'T1' },
      { level: 5, id: 'T2' },
      { level: 10, id: 'T3' },
      { level: 99, id: 'T4' },
    ])
  })

  it('should handle a global level', () => {
    expect(serialisation.deck.deserialise('5xn1n2').deck).to.deep.equal([
      { level: 5, id: 'N1' },
      { level: 5, id: 'N2' },
    ])
  })

  it('should handle sides', () => {
    expect(
      serialisation.deck.deserialise(
        '3xn1n2s1n3s24s2n63n67s6n15s8s11-1xn1n8n4n3n50'
      ).variants
    ).to.deep.equal({
      N1: [
        { level: 1, id: 'N8' },
        { level: 1, id: 'N4' },
      ],
      N3: [{ level: 1, id: 'N50' }],
    })
  })
})
