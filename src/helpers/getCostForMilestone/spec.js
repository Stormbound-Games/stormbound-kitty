import getCostForMilestone from './'

describe('The `getCostForMilestone` helper', () => {
  it('should return 0 coins for the first milestone', () => {
    expect(
      getCostForMilestone({ milestone: 0, league: 'BRAWL', winRatio: 0.75 })
    ).toEqual(0)
  })

  it('should handle 100% win rate', () => {
    expect(
      getCostForMilestone({ milestone: 1, league: 'BRAWL', winRatio: 1 })
    ).toEqual(40)
    expect(
      getCostForMilestone({ milestone: 9, league: 'BRAWL', winRatio: 1 })
    ).toEqual(13890)
  })
})
