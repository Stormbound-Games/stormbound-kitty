import searchCards from './'

describe('The `searchCards` helper', () => {
  it('should skip 1-character searches', () => {
    expect(searchCards(global.__CARDS__, 'a').length).toEqual(0)
  })

  it('should handle ID searches', () => {
    expect(searchCards(global.__CARDS__, 'n1').length).toEqual(1)
    expect(searchCards(global.__CARDS__, 'N1').length).toEqual(1)
  })

  it('should handle abbreviation searches', () => {
    expect(searchCards(global.__CARDS__, 'rof').length).toEqual(1)
    expect(searchCards(global.__CARDS__, 'fs').length).toEqual(3)
  })
})
