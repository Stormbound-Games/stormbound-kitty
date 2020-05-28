import abbreviate from './'

describe('The `abbreviate` helper', () => {
  it('should abbreviate a card name', () => {
    expect(abbreviate('Victors of the Melee')).to.equal('votm')
  })

  it('should remove commas', () => {
    expect(abbreviate('Xuri, Lord of Life')).to.equal('xlol')
  })
})
