import unfoldValue from './'

describe('The `unfoldValue` helper', () => {
  it('should stringify and split on slashes', () => {
    expect(unfoldValue('kitty')).toEqual(['kitty'])
    expect(unfoldValue('k/i/t/t/y')).toEqual(['k', 'i', 't', 't', 'y'])
    expect(unfoldValue(1)).toEqual(['1'])
    expect(unfoldValue(undefined)).toEqual([''])
  })
})
