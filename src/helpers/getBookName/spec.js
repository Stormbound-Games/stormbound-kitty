import getBookName from './'

describe('The `getBookName` helper', () => {
  it('should handle singular', () => {
    expect(getBookName('MYTHIC')).to.equal('Mythic Tome')
  })

  it('should handle plural', () => {
    expect(getBookName('MYTHIC', true)).to.equal('Mythic Tomes')
  })
})
