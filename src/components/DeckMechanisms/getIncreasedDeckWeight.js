import { increaseCardWeight } from '../../helpers/resolveDeckWeight'
import hasInHand from '../../helpers/hasInHand'
import areCardsEqual from '../../helpers/areCardsEqual'

const getIncreasedDeckWeight = ({ deck, hand, reset }) => {
  const isReset = card =>
    reset.find(resetCard => areCardsEqual(resetCard, card))
  return deck.map(card => {
    if (hasInHand(card, hand) && !isReset) {
      return card
    }

    const weight = isReset(card) ? 0 : increaseCardWeight(card.weight)
    return { ...card, weight }
  })
}

export default getIncreasedDeckWeight
