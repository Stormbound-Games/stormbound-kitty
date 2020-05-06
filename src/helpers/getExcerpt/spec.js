import getExcerpt from './'

describe('The `getExcerpt` helper', () => {
  it('should slice a string at correct length', () => {
    expect(getExcerpt('Foobar', 4).length - 1).to.equal(4)
  })

  it('should append an ellipsis', () => {
    expect(getExcerpt('Foobar', 4).slice(-1)).to.equal('…')
  })

  it('should avoid double punctuation at the end', () => {
    expect(getExcerpt('Foo?b', 4)).to.equal('Foo…')
    expect(getExcerpt('Foo.b', 4)).to.equal('Foo…')
    expect(getExcerpt('Foo…b', 4)).to.equal('Foo…')
    expect(getExcerpt('Foo,b', 4)).to.equal('Foo…')
  })
})
