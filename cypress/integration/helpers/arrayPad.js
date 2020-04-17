import arrayPad from '../../../src/helpers/arrayPad'

describe('The `arrayPad` helper', () => {
  it('should pad an array', () => {
    expect(arrayPad([], 3, 'a')).to.deep.equal(['a', 'a', 'a'])
  })

  it('should leave an array of correct length alone', () => {
    expect(arrayPad([1, 1, 1], 3, 'a')).to.deep.equal([1, 1, 1])
    expect(arrayPad([1, 1, 1, 1], 3, 'a')).to.deep.equal([1, 1, 1, 1])
  })
})
