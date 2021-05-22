const getWinCoins = setup => {
  switch (setup) {
    case 'MOBILE_WITHOUT_ADS':
      return 5
    case 'MOBILE_WITH_ADS':
      return 20
    case 'STEAM_OR_WEB':
      return 10
    case 'NONE':
      return 0
    default:
      return 1
  }
}

export default getWinCoins
