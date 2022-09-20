import getMilestoneIndexFromCoins from './index.js'

describe('The `getMilestoneIndexFromCoins` helper', () => {
  it('should return first milestone even with 0 coins', () => {
    expect(
      getMilestoneIndexFromCoins({
        coins: 0,
        league: 'BRAWL',
        winRatio: 0.75,
        crowns: 0,
      })
    ).toEqual(0)
  })

  it('should return last milestone with enough coins', () => {
    expect(
      getMilestoneIndexFromCoins({
        coins: 30000,
        league: 'BRAWL',
        winRatio: 1,
        crowns: 0,
      })
    ).toEqual(9)
  })
})
