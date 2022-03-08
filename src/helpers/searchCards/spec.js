import searchCards from './'

describe('The `searchCards` helper', () => {
  it('should skip 1-character searches', () => {
    expect(
      searchCards(global.__CARDS__, global.__ABBREVIATIONS__, 'a').length
    ).toEqual(0)
  })

  it('should handle ID searches', () => {
    expect(
      searchCards(global.__CARDS__, global.__ABBREVIATIONS__, 'n1').length
    ).toEqual(1)
    expect(
      searchCards(global.__CARDS__, global.__ABBREVIATIONS__, 'N1').length
    ).toEqual(1)
  })

  it('should handle abbreviation searches', () => {
    expect(
      searchCards(global.__CARDS__, global.__ABBREVIATIONS__, 'rof').length
    ).toEqual(1)
    expect(
      searchCards(global.__CARDS__, global.__ABBREVIATIONS__, 'fs').length
    ).toEqual(3)
  })
})
