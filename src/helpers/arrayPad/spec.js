import arrayPad from './'

describe('The `arrayPad` helper', () => {
  it('should pad an array', () => {
    expect(arrayPad([], 3, 'a')).toEqual(['a', 'a', 'a'])
  })

  it('should leave an array of correct length alone', () => {
    expect(arrayPad([1, 1, 1], 3, 'a')).toEqual([1, 1, 1])
    expect(arrayPad([1, 1, 1, 1], 3, 'a')).toEqual([1, 1, 1, 1])
  })
})
