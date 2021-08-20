import getPeriodMultiplier from './'

describe('The `getPeriodMultiplier` helper', () => {
  it('should handle YEARLY', () => {
    expect(getPeriodMultiplier('YEARLY')).toEqual(365.25)
  })
  it('should handle MONTHLY', () => {
    expect(getPeriodMultiplier('MONTHLY')).toEqual(365.25 / 12)
  })
  it('should handle WEEKLY', () => {
    expect(getPeriodMultiplier('WEEKLY')).toEqual(7)
  })
  it('should handle DAILY', () => {
    expect(getPeriodMultiplier('DAILY')).toEqual(1)
  })
})
