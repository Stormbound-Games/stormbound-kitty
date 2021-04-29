import { COIN_MULTIPLIERS } from '../../constants/brawl'

const getCoinsForWin = (setup, withPremiumPass = false) => {
  const cap = withPremiumPass ? 700 : 400
  let coins = 0

  return (winRatio = 1) => {
    if (coins < cap) {
      const extra = COIN_MULTIPLIERS[setup] * winRatio
      coins += extra
      return extra
    }

    return COIN_MULTIPLIERS.NONE
  }
}

export default getCoinsForWin
