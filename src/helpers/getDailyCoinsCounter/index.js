import getVictoryCoins from '../getVictoryCoins'

const getDailyCoinsCounter = ({ setup, league, withPremiumPass = false }) => {
  const cap = withPremiumPass ? 700 : 400
  let coins = 0

  return (winRatio = 1) => {
    if (coins < cap) {
      const extra = getVictoryCoins(setup, league) * winRatio
      coins += extra
      return extra
    }

    return getVictoryCoins('NONE', league)
  }
}

export default getDailyCoinsCounter
