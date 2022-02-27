import searchCards from './'

describe.skip('The `searchCards` helper', () => {
  it('should skip 1-character searches', () => {
    expect(searchCards('a').length).toEqual(0)
  })

  it('should handle ID searches', () => {
    expect(searchCards('n1').length).toEqual(1)
    expect(searchCards('N1').length).toEqual(1)
  })

  it('should handle abbreviation searches', () => {
    expect(searchCards('rof').length).toEqual(1)
    expect(searchCards('fs').length).toEqual(3)
  })
})
