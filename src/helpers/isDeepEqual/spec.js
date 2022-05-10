import isDeepEqual from './'

describe('The `isDeepEqual` helper', () => {
  it('should handle empty objects', () => {
    expect(isDeepEqual({}, {})).toEqual(true)
  })

  it('should handle same object', () => {
    const obj = { foo: 'bar' }
    expect(isDeepEqual(obj, obj)).toEqual(true)
  })

  it('should handle equal objects', () => {
    const x = { foo: 'bar' }
    const y = { foo: 'bar' }
    expect(isDeepEqual(x, y)).toEqual(true)
  })

  it('should handle equal objects with different key order', () => {
    const x = { foo: 'bar', bar: 'foo' }
    const y = { bar: 'foo', foo: 'bar' }
    expect(isDeepEqual(x, y)).toEqual(true)
  })

  it('should return false for unequal objects', () => {
    const x = { foo: 'bar', bar: 'foo' }
    const y = { bar: 'foo' }
    expect(isDeepEqual(x, y)).toEqual(false)
  })
})
