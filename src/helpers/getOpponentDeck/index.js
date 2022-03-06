import getOpponentFaction from '~/helpers/getOpponentFaction'
import getRandomDeck from '~/helpers/getRandomDeck'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import indexArray from '~/helpers/indexArray'

const getOpponentDeck = (availableCards, brawls, modifier) =>
  getRandomDeck({
    availableCards,
    faction: getOpponentFaction(brawls, modifier),
  }).map(card => getResolvedCardData(indexArray(availableCards), card))

export default getOpponentDeck
