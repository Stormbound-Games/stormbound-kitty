import getVictoryCoins from './'

describe('The `getVictoryCoins` helper', () => {
  it('should handle MOBILE_WITHOUT_ADS', () => {
    expect(getVictoryCoins('MOBILE_WITHOUT_ADS')).to.equal(5)
  })
  it('should handle MOBILE_WITH_ADS', () => {
    expect(getVictoryCoins('MOBILE_WITH_ADS')).to.equal(20)
  })
  it('should handle STEAM_OR_WEB', () => {
    expect(getVictoryCoins('STEAM_OR_WEB')).to.equal(10)
  })
})
