import { increaseCardWeight } from '../../helpers/resolveDeckWeight'
import areCardsEqual from '../../helpers/areCardsEqual'

const getIncreasedDeckWeight = ({ deck, hand, reset }) => {
  const isReset = card =>
    reset.find(resetCard => areCardsEqual(resetCard, card))
  return deck.map(card => {
    if (hand.find(cardInHand => areCardsEqual(cardInHand, card)) && !isReset) {
      return card
    }

    const weight = isReset(card) ? 0 : increaseCardWeight(card.weight)
    return { ...card, weight }
  })
}

export default getIncreasedDeckWeight
