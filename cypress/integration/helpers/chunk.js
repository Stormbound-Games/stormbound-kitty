import chunk from '../../../src/helpers/chunk'

describe('The `chunk` helper', () => {
  it('should leave an empty array untouched', () => {
    expect(chunk([], 2)).to.deep.equal([])
  })

  it('should return an empty array if size is below 1', () => {
    expect(chunk([], 2)).to.deep.equal([])
  })

  it('should split array in chunks', () => {
    expect(chunk([0, 1, 2, 3], 2)).to.deep.equal([
      [0, 1],
      [2, 3],
    ])
  })

  it('should handle leftovers', () => {
    expect(chunk([0, 1, 2, 3, 4], 2)).to.deep.equal([[0, 1], [2, 3], [4]])
  })

  it('should leave empty arrays alone', () => {
    expect(chunk([], 2)).to.deep.equal([])
  })
})
