import getDailyCoinsCounter from './'

describe('The `getDailyCoinsCounter` helper', () => {
  it('should cap gains at 400 (with ads)', () => {
    const getCoins = getDailyCoinsCounter('MOBILE_WITH_ADS')
    for (let i = 0; i < 400 / 20; i += 1) {
      expect(getCoins()).to.equal(20)
    }
    expect(getCoins()).to.equal(0)
  })

  it('should cap gains at 400 (without ads)', () => {
    const getCoins = getDailyCoinsCounter('MOBILE_WITHOUT_ADS')
    for (let i = 0; i < 400 / 5; i += 1) {
      expect(getCoins()).to.equal(5)
    }
    expect(getCoins()).to.equal(0)
  })

  it('should cap gains at 400 (steam)', () => {
    const getCoins = getDailyCoinsCounter('STEAM')
    for (let i = 0; i < 400 / 10; i += 1) {
      expect(getCoins()).to.equal(10)
    }
    expect(getCoins()).to.equal(0)
  })

  it('should cap gains at 700 with premium pass', () => {
    const getCoins = getDailyCoinsCounter('MOBILE_WITH_ADS', true)
    for (let i = 0; i < 700 / 20; i += 1) {
      expect(getCoins()).to.equal(20)
    }
    expect(getCoins()).to.equal(0)
  })
})
