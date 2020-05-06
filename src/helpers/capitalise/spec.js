import capitalise from './'

describe('The `capitalise` helper', () => {
  it('should put the first letter uppercase', () => {
    expect(capitalise('kitty')).to.equal('Kitty')
  })

  it('should leave other letters untouched', () => {
    expect(capitalise('kittY')).to.equal('KittY')
  })
})
