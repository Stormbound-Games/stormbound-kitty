import clamp from './index.js'

describe('The `clamp` helper', () => {
  it('should leave a valid value untouched', () => {
    expect(clamp(3, 1, 4)).toEqual(3)
  })

  it('should handle minimum', () => {
    expect(clamp(3, 4, 8)).toEqual(4)
  })

  it('should handle maximum', () => {
    expect(clamp(10, 4, 8)).toEqual(8)
  })
})
