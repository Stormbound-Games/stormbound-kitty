import getDailyCoinsCounter from './'

describe('The `getDailyCoinsCounter` helper', () => {
  it('should cap gains at 400 (with ads)', () => {
    const getCoins = getDailyCoinsCounter({
      setup: 'MOBILE_WITH_ADS',
      league: 'STARTER',
    })
    for (let i = 0; i < 400 / 20; i += 1) {
      expect(getCoins()).toEqual(20)
    }
    expect(getCoins()).toEqual(0)
  })

  it('should cap gains at 400 (without ads)', () => {
    const getCoins = getDailyCoinsCounter({
      setup: 'MOBILE_WITHOUT_ADS',
      league: 'STARTER',
    })
    for (let i = 0; i < 400 / 10; i += 1) {
      expect(getCoins()).toEqual(10)
    }
    expect(getCoins()).toEqual(0)
  })

  it('should cap gains at 400 (steam)', () => {
    const getCoins = getDailyCoinsCounter({
      setup: 'STEAM_OR_WEB',
      league: 'STARTER',
    })
    for (let i = 0; i < 400 / 10; i += 1) {
      expect(getCoins()).toEqual(10)
    }
    expect(getCoins()).toEqual(0)
  })

  it('should cap gains at 700 with premium pass', () => {
    const getCoins = getDailyCoinsCounter({
      setup: 'MOBILE_WITH_ADS',
      league: 'STARTER',
      withPremiumPass: true,
    })
    for (let i = 0; i < 700 / 20; i += 1) {
      expect(getCoins()).toEqual(20)
    }
    expect(getCoins()).toEqual(0)
  })
})
