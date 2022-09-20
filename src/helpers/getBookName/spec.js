import getBookName from './index.js'

describe('The `getBookName` helper', () => {
  it('should handle singular', () => {
    expect(getBookName('MYTHIC')).toEqual('Mythic Tome')
  })

  it('should handle plural', () => {
    expect(getBookName('MYTHIC', true)).toEqual('Mythic Tomes')
  })
})
