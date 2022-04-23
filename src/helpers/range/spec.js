import range from './'

describe('The `range` helper', () => {
  it('should return the range between two values', () => {
    expect(range(0, 2)).toEqual([0, 1, 2])
  })

  it('should handle min = max', () => {
    expect(range(0, 0)).toEqual([0])
  })
})
