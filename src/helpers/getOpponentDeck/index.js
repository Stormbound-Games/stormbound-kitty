import getOpponentFaction from '~/helpers/getOpponentFaction'
import getRandomDeck from '~/helpers/getRandomDeck'
import getResolvedCardData from '~/helpers/getResolvedCardData'

const getOpponentDeck = modifier =>
  getRandomDeck({ faction: getOpponentFaction(modifier) }).map(
    getResolvedCardData
  )

export default getOpponentDeck
