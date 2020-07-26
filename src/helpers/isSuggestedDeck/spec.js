import isSuggestedDeck from './'

describe('The `isSuggestedDeck` helper', () => {
  it('should return undefined for a non-suggested deck', () => {
    const deck = [
      { id: 'N1', level: 5 },
      { id: 'N2', level: 5 },
      { id: 'N3', level: 5 },
      { id: 'N4', level: 5 },
      { id: 'N5', level: 5 },
      { id: 'N6', level: 5 },
      { id: 'N7', level: 5 },
      { id: 'N8', level: 5 },
      { id: 'N9', level: 5 },
      { id: 'N10', level: 5 },
      { id: 'N11', level: 5 },
      { id: 'N12', level: 5 },
    ]
    expect(isSuggestedDeck(deck)).to.equal(undefined)
  })

  it('should return suggested deck if found', () => {
    const deck = [
      { level: 3, id: 'N1' },
      { level: 3, id: 'N2' },
      { level: 3, id: 'S1' },
      { level: 3, id: 'N3' },
      { level: 3, id: 'S24' },
      { level: 3, id: 'S2' },
      { level: 3, id: 'N63' },
      { level: 3, id: 'N67' },
      { level: 3, id: 'S6' },
      { level: 3, id: 'N15' },
      { level: 3, id: 'S8' },
      { level: 3, id: 'S11' },
    ]
    expect(isSuggestedDeck(deck).name).to.equal('Reckless Rush')
  })
})
