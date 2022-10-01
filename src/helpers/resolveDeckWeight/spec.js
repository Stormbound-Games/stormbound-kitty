import resolveDeckWeight from './index.js'

describe('The `resolveDeckWeight` helper', () => {
  const deck = [
    { id: 'N1' },
    { id: 'N2' },
    { id: 'N3' },
    { id: 'N4' },
    { id: 'N5' },
    { id: 'N6' },
    { id: 'N7' },
    { id: 'N8' },
    { id: 'N9' },
    { id: 'N10' },
    { id: 'N11' },
    { id: 'N12' },
  ]
  it('should add weight to all cards in the deck', () => {
    expect(
      resolveDeckWeight(global.__CARDS_INDEX__, deck).every(
        card => typeof card.weight === 'number'
      )
    ).toEqual(true)
  })
})
