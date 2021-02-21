import getPeriodMultiplier from './'

describe('The `getPeriodMultiplier` helper', () => {
  it('should handle YEARLY', () => {
    expect(getPeriodMultiplier('YEARLY')).to.equal(365.25)
  })
  it('should handle MONTHLY', () => {
    expect(getPeriodMultiplier('MONTHLY')).to.equal(365.25 / 12)
  })
  it('should handle WEEKLY', () => {
    expect(getPeriodMultiplier('WEEKLY')).to.equal(7)
  })
  it('should handle DAILY', () => {
    expect(getPeriodMultiplier('DAILY')).to.equal(1)
  })
})
