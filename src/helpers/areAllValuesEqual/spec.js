import areAllValuesEqual from './'

describe('The `areAllValuesEqual` helper', () => {
  it('should return true for an empty array', () => {
    expect(areAllValuesEqual([])).toEqual(true)
  })

  it('should return true for an array with all values equal', () => {
    expect(areAllValuesEqual(['a', 'a', 'a'])).toEqual(true)
  })

  it('should return false for an array with all values not equal', () => {
    expect(areAllValuesEqual(['a', 'a', 'b'])).toEqual(false)
  })

  it('should only work with primitives', () => {
    expect(areAllValuesEqual([{ a: 1 }, { a: 1 }, { a: 1 }])).toEqual(false)
  })
})
