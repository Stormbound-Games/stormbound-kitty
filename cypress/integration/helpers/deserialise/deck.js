import {
  deserialiseDeck,
  deserialiseCards,
} from '../../../../src/helpers/deserialise'

describe('The `deserialiseDeck` helper', () => {
  it('should handle decks serialised with the old system', () => {
    expect(
      deserialiseCards('5N1,5N2,5F2,5F3,5N3,5F5,5N12,5N16,5F14,5F15,5N30,5N57')
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
      deserialiseCards('5N15N25F25F35N35F55N125N165F145F155N305N57')
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
    expect(deserialiseCards('5N15N25F25F3')).to.deep.equal([
      { level: 5, id: 'N1' },
      { level: 5, id: 'N2' },
      { level: 5, id: 'F2' },
      { level: 5, id: 'F3' },
    ])
  })

  it('should handle tokens', () => {
    expect(deserialiseCards('01T105T210T399T4')).to.deep.equal([
      { level: 1, id: 'T1' },
      { level: 5, id: 'T2' },
      { level: 10, id: 'T3' },
      { level: 99, id: 'T4' },
    ])
  })

  it('should be a atob wrapper around `deserialisedCards`', () => {
    const cards = '01T105T210T399T4'

    expect(deserialiseDeck(btoa(cards))).to.deep.equal(deserialiseCards(cards))
  })
})
