import getVictoryCoins from '../getVictoryCoins'

const getCoinsForWin = (setup, withPremiumPass = false) => {
  const cap = withPremiumPass ? 700 : 400
  let coins = 0

  return (winRatio = 1) => {
    if (coins < cap) {
      const extra = getVictoryCoins(setup) * winRatio
      coins += extra
      return extra
    }

    return getVictoryCoins('NONE')
  }
}

export default getCoinsForWin
