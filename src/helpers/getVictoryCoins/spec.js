import getVictoryCoins from './'

describe('The `getVictoryCoins` helper', () => {
  it('should handle MOBILE_WITHOUT_ADS', () => {
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'STARTER')).toEqual(10)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'IRON')).toEqual(10)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'BRONZE')).toEqual(10)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'SILVER')).toEqual(10)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'GOLD')).toEqual(10)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'PLATINUM')).toEqual(15)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'DIAMOND')).toEqual(20)
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS', 'HEROES')).toEqual(25)
  })

  it('should handle MOBILE_WITH_ADS', () => {
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'STARTER')).toEqual(20)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'IRON')).toEqual(20)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'BRONZE')).toEqual(20)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'SILVER')).toEqual(20)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'GOLD')).toEqual(20)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'PLATINUM')).toEqual(30)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'DIAMOND')).toEqual(40)
    expect(getVictoryCoins('MOBILE_WITH_ADS', 'HEROES')).toEqual(50)
  })

  it('should handle STEAM_OR_WEB', () => {
    expect(getVictoryCoins('STEAM_OR_WEB', 'STARTER')).toEqual(10)
  })
})
