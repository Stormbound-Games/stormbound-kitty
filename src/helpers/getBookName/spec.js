import getBookName from './'

describe('The `getBookName` helper', () => {
  it('should handle simple names', () => {
    expect(getBookName('MYTHIC')).to.equal('Mythic')
  })

  it('should handle multiple names', () => {
    expect(getBookName('LEGENDARY_DRAGON')).to.equal('Legendary Dragon')
  })
})
