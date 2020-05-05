import serialisation from '../../../src/helpers/serialisation'

describe('The `serialisation.deck.serialise` helper', () => {
  it('should serialise some cards', () => {
    expect(serialisation.cards.serialise([{ level: 1, id: 'N1' }])).to.equal(
      '1N1'
    )
  })

  it('should handle tokens with a forced padding', () => {
    expect(
      serialisation.cards.serialise([
        { level: 1, id: 'T1', token: true },
        { level: 10, id: 'T2', token: true },
      ])
    ).to.equal('01T110T2')
  })

  it('should strip out empty cards', () => {
    expect(
      serialisation.cards.serialise([{ level: 1, id: 'N1' }, null, {}])
    ).to.equal('1N1')
  })

  it('should be a btoa wrapper around `serialisation.cards.serialise`', () => {
    const cards = [{ level: 1, id: 'N1' }]

    expect(serialisation.deck.serialise(cards)).to.equal(
      btoa(serialisation.cards.serialise(cards))
    )
  })
})

describe('The `serialisation.deck.deserialise` helper', () => {
  it('should handle decks serialised with the old system', () => {
    expect(
      serialisation.cards.deserialise(
        '5N1,5N2,5F2,5F3,5N3,5F5,5N12,5N16,5F14,5F15,5N30,5N57'
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
      serialisation.cards.deserialise(
        '5N15N25F25F35N35F55N125N165F145F155N305N57'
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
    expect(serialisation.cards.deserialise('5N15N25F25F3')).to.deep.equal([
      { level: 5, id: 'N1' },
      { level: 5, id: 'N2' },
      { level: 5, id: 'F2' },
      { level: 5, id: 'F3' },
    ])
  })

  it('should handle tokens', () => {
    expect(serialisation.cards.deserialise('01T105T210T399T4')).to.deep.equal([
      { level: 1, id: 'T1' },
      { level: 5, id: 'T2' },
      { level: 10, id: 'T3' },
      { level: 99, id: 'T4' },
    ])
  })

  it('should be a atob wrapper around `serialisation.cards.deserialise`', () => {
    const cards = '01T105T210T399T4'

    expect(serialisation.deck.deserialise(btoa(cards))).to.deep.equal(
      serialisation.cards.deserialise(cards)
    )
  })
})
