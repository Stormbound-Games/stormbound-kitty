import getOpponentFaction from '~/helpers/getOpponentFaction'
import getRandomDeck from '~/helpers/getRandomDeck'
import getResolvedCardData from '~/helpers/getResolvedCardData'

export default modifier =>
  getRandomDeck({ faction: getOpponentFaction(modifier) }).map(
    getResolvedCardData
  )
