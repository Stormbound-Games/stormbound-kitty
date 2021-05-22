import getWinCoins from '../getWinCoins'

const getCoinsForWin = (setup, withPremiumPass = false) => {
  const cap = withPremiumPass ? 700 : 400
  let coins = 0

  return (winRatio = 1) => {
    if (coins < cap) {
      const extra = getWinCoins(setup) * winRatio
      coins += extra
      return extra
    }

    return getWinCoins('NONE')
  }
}

export default getCoinsForWin
