import getMilestoneIndexFromCoins from './'

describe('The `getMilestoneIndexFromCoins` helper', () => {
  it('should return first milestone even with 0 coins', () => {
    expect(
      getMilestoneIndexFromCoins({ coins: 0, winRatio: 0.75, crowns: 0 })
    ).to.equal(0)
  })

  it('should return last milestone with enough coins', () => {
    expect(
      getMilestoneIndexFromCoins({ coins: 30000, winRatio: 1, crowns: 0 })
    ).to.equal(9)
  })
})
