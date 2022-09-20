import capitalize from './index.js'

describe('The `capitalize` helper', () => {
  it('should put the first letter uppercase', () => {
    expect(capitalize('kitty')).toEqual('Kitty')
  })

  it('should leave other letters untouched', () => {
    expect(capitalize('kittY')).toEqual('KittY')
  })
})
