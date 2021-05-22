const getBaseCoinsPerLeague = league => {
  switch (league) {
    case 'HEROES':
      return 25
    case 'DIAMOND':
      return 20
    case 'PLATINUM':
      return 15
    case 'GOLD':
    case 'SILVER':
    case 'BRONZE':
    case 'IRON':
    case 'STARTER':
    case 'BRAWL':
      return 10
    default:
      return 0
  }
}

const getVictoryCoins = (setup, league, withPremiumPass = false) => {
  switch (setup) {
    case 'MOBILE_WITHOUT_ADS':
      return getBaseCoinsPerLeague(league) * (withPremiumPass ? 2 : 1)
    case 'MOBILE_WITH_ADS':
      return getBaseCoinsPerLeague(league) * 2
    case 'STEAM':
    case 'STEAM_OR_WEB':
      return getBaseCoinsPerLeague('STARTER') * (withPremiumPass ? 2 : 1)
    case 'NONE':
      return 0
    default:
      return 1
  }
}

export default getVictoryCoins
