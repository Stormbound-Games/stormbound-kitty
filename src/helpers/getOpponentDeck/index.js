import cards from '../../data/cards'
import getOpponentFaction from '../getOpponentFaction'
import getRandomDeck from '../getRandomDeck'
import getResolvedCardData from '../getResolvedCardData'

export default modifier =>
  getRandomDeck({
    faction: getOpponentFaction(modifier),
    availableCards: cards.filter(card => !card.token),
    maxEpicCards: 4,
    maxLegendaryCards: 2,
    minFactionCards: 4,
  }).map(getResolvedCardData)
