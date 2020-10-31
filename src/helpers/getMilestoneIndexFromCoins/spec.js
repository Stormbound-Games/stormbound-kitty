import getMilestoneIndexFromCoins from './'

describe('The `getMilestoneIndexFromCoins` helper', () => {
  it('should return first milestone even with 0 coins', () => {
    expect(getMilestoneIndexFromCoins(0, 0.75)).to.equal(0)
  })

  it('should return last milestone with enough coins', () => {
    expect(getMilestoneIndexFromCoins(30000, 1)).to.equal(9)
  })
})
