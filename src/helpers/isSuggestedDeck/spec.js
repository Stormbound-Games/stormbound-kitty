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
      { level: 5, id: 'N1' },
      { level: 5, id: 'N2' },
      { level: 5, id: 'W2' },
      { level: 5, id: 'N12' },
      { level: 5, id: 'N16' },
      { level: 5, id: 'N20' },
      { level: 5, id: 'W9' },
      { level: 5, id: 'N34' },
      { level: 5, id: 'W10' },
      { level: 5, id: 'N45' },
      { level: 5, id: 'W27' },
      { level: 5, id: 'W19' },
    ]
    expect(isSuggestedDeck(deck).name).to.equal('Aftershock Core')
  })
})
