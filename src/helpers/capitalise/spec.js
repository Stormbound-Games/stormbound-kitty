import capitalise from './'

describe('The `capitalise` helper', () => {
  it('should put the first letter uppercase', () => {
    expect(capitalise('kitty')).toEqual('Kitty')
  })

  it('should leave other letters untouched', () => {
    expect(capitalise('kittY')).toEqual('KittY')
  })
})
