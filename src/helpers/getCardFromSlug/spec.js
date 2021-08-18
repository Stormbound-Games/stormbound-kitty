import getCardFromSlug from './'

describe('The `getCardFromSlug` helper', () => {
  it('should find a card from its ID', () => {
    expect(getCardFromSlug('N1').name).to.equal('Green Prototypes')
  })

  it('should from its slugified name', () => {
    expect(getCardFromSlug('green_prototypes').id).to.equal('N1')
  })

  it('should take commas into account', () => {
    expect(getCardFromSlug('xuri_lord_of_life').id).to.equal('S19')
  })

  it('should take quotes into account', () => {
    expect(getCardFromSlug('heralds_hymn').id).to.equal('S20')
  })
})
