import getCostForMilestone from './'

describe('The `getCostForMilestone` helper', () => {
  it('should return 0 coins for the first milestone', () => {
    expect(getCostForMilestone(0, 75)).to.equal(0)
  })

  it('should handle 100% win rate', () => {
    expect(getCostForMilestone(1, 100)).to.equal(40)
    expect(getCostForMilestone(9, 100)).to.equal(13890)
  })
})
