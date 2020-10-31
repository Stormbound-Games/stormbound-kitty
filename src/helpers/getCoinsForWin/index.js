import { COIN_MULTIPLIERS } from '../../constants/brawl'

const getCoinsForWin = setup => {
  let coins = 0

  return (winRatio = 1) => {
    if (coins < 400) {
      const extra = COIN_MULTIPLIERS[setup] * winRatio
      coins += extra
      return extra
    }

    return COIN_MULTIPLIERS.NONE
  }
}

export default getCoinsForWin
