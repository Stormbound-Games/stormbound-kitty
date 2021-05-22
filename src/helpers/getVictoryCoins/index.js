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
      return 10
    default:
      return 0
  }
}

const getVictoryCoins = (setup, league) => {
  switch (setup) {
    case 'MOBILE_WITHOUT_ADS':
      // @TODO: remove ternary when `league` is being provided in every single
      // call of this helper.
      return league ? getBaseCoinsPerLeague(league) : 5
    case 'MOBILE_WITH_ADS':
      // @TODO: remove ternary when `league` is being provided in every single
      // call of this helper.
      return league ? getBaseCoinsPerLeague(league) * 2 : 20
    case 'STEAM_OR_WEB':
      // @TODO: figure out what are the values for Steam based on the league.
      return 10
    case 'NONE':
      return 0
    default:
      return 1
  }
}

export default getVictoryCoins
