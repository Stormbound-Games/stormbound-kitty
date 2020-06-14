import getOpponentFaction from '../getOpponentFaction'
import getRandomDeck from '../getRandomDeck'
import getResolvedCardData from '../getResolvedCardData'

export default modifier =>
  getRandomDeck({ faction: getOpponentFaction(modifier) }).map(
    getResolvedCardData
  )
