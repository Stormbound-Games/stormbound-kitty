import searchCards from './'

describe('The `searchCards` helper', () => {
  it('should skip 1-character searches', () => {
    expect(searchCards('a').length).to.equal(0)
  })

  it('should handle ID searches', () => {
    expect(searchCards('n1').length).to.equal(1)
    expect(searchCards('N1').length).to.equal(1)
  })

  it('should handle abbreviation searches', () => {
    expect(searchCards('rof').length).to.equal(1)
    expect(searchCards('fs').length).to.equal(3)
  })

  it('should handle fuzzy searches', () => {
    expect(searchCards('greprot').length).to.equal(1)
    expect(searchCards('souls').length).to.equal(3)
  })
})
