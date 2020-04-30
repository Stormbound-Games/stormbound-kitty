import { increaseCardWeight } from '../../helpers/resolveDeckWeight'
import isCard from '../../helpers/isCard'

const getIncreasedDeckWeight = ({ deck, hand, reset }) => {
  const isReset = card => reset.find(isCard(card))

  return deck.map(card => {
    if (hand.find(isCard(card)) && !isReset(card)) {
      return card
    }

    const weight = isReset(card) ? 0 : increaseCardWeight(card.weight)
    return { ...card, weight }
  })
}

export default getIncreasedDeckWeight
