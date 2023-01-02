import getOpponentFaction from '#helpers/getOpponentFaction'
import getRandomDeck from '#helpers/getRandomDeck'
import getResolvedCardData from '#helpers/getResolvedCardData'
import indexArray from '#helpers/indexArray'

const getOpponentDeck = ({ cards, brawls, modifier, opponentFinch }) => {
  const cardsIndex = indexArray(cards)
  const faction = getOpponentFaction(brawls, modifier)
  const initialCards = opponentFinch ? [{ id: 'N106' }] : []
  // To avoid any confusion, make sure never to draw Malicious Finch *unless* we
  // explicitly expect Malicious Finch in the opponent deck.
  cards = cards.filter(card => card !== 'N106' || opponentFinch)

  return getRandomDeck({
    availableCards: cards,
    faction,
    initialCards,
  }).map(card => getResolvedCardData(cardsIndex, card))
}

export default getOpponentDeck
