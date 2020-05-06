import areAllValuesEqual from './'

describe('The `areAllValuesEqual` helper', () => {
  it('should return true for an empty array', () => {
    expect(areAllValuesEqual([])).to.equal(true)
  })

  it('should return true for an array with all values equal', () => {
    expect(areAllValuesEqual(['a', 'a', 'a'])).to.equal(true)
  })

  it('should return false for an array with all values not equal', () => {
    expect(areAllValuesEqual(['a', 'a', 'b'])).to.equal(false)
  })

  it('should only work with primitives', () => {
    expect(areAllValuesEqual([{ a: 1 }, { a: 1 }, { a: 1 }])).to.equal(false)
  })
})
