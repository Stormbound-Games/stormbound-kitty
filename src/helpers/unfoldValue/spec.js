import unfoldValue from './'

describe('The `unfoldValue` helper', () => {
  it('should stringify and split on slashes', () => {
    expect(unfoldValue('kitty')).to.deep.equal(['kitty'])
    expect(unfoldValue('k/i/t/t/y')).to.deep.equal(['k', 'i', 't', 't', 'y'])
    expect(unfoldValue(1)).to.deep.equal(['1'])
  })
})
