import getOpponentFaction from '../getOpponentFaction'
import getRandomDeck from '../getRandomDeck'
import getResolvedCardData from '../getResolvedCardData'

export default modifier =>
  getRandomDeck({
    faction: getOpponentFaction(modifier),
    maxEpicCards: 4,
    maxLegendaryCards: 2,
    minFactionCards: 4,
  }).map(getResolvedCardData)
