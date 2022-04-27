import resolveLeveledProperty from './'

describe('The `resolveLeveledProperty` helper', () => {
  it('should return argument if already resolved', () => {
    const input = {
      values: ['1', '2', '3', '4', '5'],
      display: '1/2/3/4/5',
    }

    expect(resolveLeveledProperty(input)).toEqual(input)
  })

  it('should return a short display if possible', () => {
    expect(resolveLeveledProperty('1')).toEqual({
      values: ['1', '1', '1', '1', '1'],
      display: '1',
    })
  })

  it('should handle incomplete leveling', () => {
    expect(resolveLeveledProperty('1/2/3')).toEqual({
      values: ['1', '2', '3', '1', '1'],
      display: '1/2/3',
    })
  })

  it('should handle empty values', () => {
    expect(resolveLeveledProperty('')).toEqual({
      values: [null, null, null, null, null],
      display: '',
    })
  })
})
