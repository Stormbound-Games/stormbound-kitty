import getPermutations from './'

describe('The `getPermutations` helper', () => {
  it('should work', () => {
    const array = ['a', 'b', 'c', 'd']

    expect(getPermutations(array, 2)).toEqual([
      ['a', 'b'],
      ['a', 'c'],
      ['a', 'd'],
      ['b', 'c'],
      ['b', 'd'],
      ['c', 'd'],
    ])
  })
})
