import getExcerpt from './'

describe('The `getExcerpt` helper', () => {
  it('should slice a string at correct length', () => {
    expect(getExcerpt('Foobar', 4).length - 1).toEqual(4)
  })

  it('should remove separators', () => {
    expect(getExcerpt('Foo---bar', 4).length - 1).toEqual(4)
  })

  it('should append an ellipsis', () => {
    expect(getExcerpt('Foobar', 4).slice(-1)).toEqual('…')
  })

  it('should avoid double punctuation at the end', () => {
    expect(getExcerpt('Foo?b', 4)).toEqual('Foo…')
    expect(getExcerpt('Foo.b', 4)).toEqual('Foo…')
    expect(getExcerpt('Foo…b', 4)).toEqual('Foo…')
    expect(getExcerpt('Foo,b', 4)).toEqual('Foo…')
  })
})
