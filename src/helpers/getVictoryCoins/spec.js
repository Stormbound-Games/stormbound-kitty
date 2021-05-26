import getVictoryCoins from './'

describe('The `getVictoryCoins` helper', () => {
  it('should handle MOBILE_WITHOUT_ADS', () => {
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'STARTER')).to.equal(10)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'IRON')).to.equal(10)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'BRONZE')).to.equal(10)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'SILVER')).to.equal(10)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'GOLD')).to.equal(10)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'PLATINUM')).to.equal(15)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'DIAMOND')).to.equal(20)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'HEROES')).to.equal(25)
  })

  it('should handle MOBILE_WITH_ADS', () => {
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'STARTER')).to.equal(20)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'IRON')).to.equal(20)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'BRONZE')).to.equal(20)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'SILVER')).to.equal(20)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'GOLD')).to.equal(20)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'PLATINUM')).to.equal(30)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'DIAMOND')).to.equal(40)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'HEROES')).to.equal(50)
  })

  it('should handle STEAM_OR_WEB', () => {
    expect(getVictoryCoins('STEAM_OR_WEB', 'STARTER')).to.equal(10)
  })
})
