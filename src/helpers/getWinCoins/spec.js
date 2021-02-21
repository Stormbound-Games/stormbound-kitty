import getWinCoins from './'

describe('The `getWinCoins` helper', () => {
  it('should handle MOBILE_WITHOUT_ADS', () => {
    expect(getWinCoins('MOBILE_WITHOUT_ADS')).to.equal(5)
  })
  it('should handle MOBILE_WITH_ADS', () => {
    expect(getWinCoins('MOBILE_WITH_ADS')).to.equal(20)
  })
  it('should handle STEAM_OR_WEB', () => {
    expect(getWinCoins('STEAM_OR_WEB')).to.equal(10)
  })
})
