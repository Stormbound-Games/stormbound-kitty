import toArray from './'

describe('The `toArray` helper', () => {
  it('should return an array', () => {
    expect(Array.isArray(toArray('foo'))).to.deep.equal(true)
  })

  it('should return value if array', () => {
    expect(toArray(['foo'])).to.deep.equal(['foo'])
  })

  it('should wrap value in array if not array', () => {
    expect(toArray('foo')).to.deep.equal(['foo'])
  })
})
